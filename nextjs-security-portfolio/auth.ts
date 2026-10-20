import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/models/User'

function getRole(email?: string | null): 'admin' | 'user' {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() || 'park478392@gmail.com'
  return adminEmail && email?.trim().toLowerCase() === adminEmail ? 'admin' : 'user'
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [Credentials({
    credentials: { email: {}, password: {} },
    async authorize(credentials) {
      const email = typeof credentials?.email === 'string' ? credentials.email.trim().toLowerCase() : ''
      const password = typeof credentials?.password === 'string' ? credentials.password : ''
      if (!email || !password || email.length > 254) return null
      await connectDB()
      const user = await User.findOne({ email })
      if (!user || !await bcrypt.compare(password, user.passwordHash)) return null
      return { id: String(user._id), name: user.name, email: user.email }
    },
  })],
  callbacks: {
    session({ session, token }) {
      // Derive permissions from the verified token, never browser input.
      session.user.role = getRole(token.email)
      return session
    },
  },
})
