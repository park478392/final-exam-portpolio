import type { Types } from 'mongoose'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/models/User'
import { Post } from '@/models/Post'

type MemberRow = { _id: Types.ObjectId; name: string; email: string; createdAt: Date }
type PostRow = { _id: Types.ObjectId; title: string; author: string; createdAt: Date }
const pageSize = 20

export async function readAdminLists(memberPage: number, postPage: number) {
  await connectDB()
  const [memberCount, postCount] = await Promise.all([
    User.countDocuments().maxTimeMS(5000),
    Post.countDocuments().maxTimeMS(5000),
  ])
  const memberPages = Math.max(1, Math.ceil(memberCount / pageSize))
  const postPages = Math.max(1, Math.ceil(postCount / pageSize))
  const currentMemberPage = Math.min(memberPage, memberPages)
  const currentPostPage = Math.min(postPage, postPages)
  const [members, posts] = await Promise.all([
    User.find({}, { _id: 1, name: 1, email: 1, createdAt: 1 })
      .sort({ createdAt: -1, _id: -1 })
      .skip((currentMemberPage - 1) * pageSize)
      .limit(pageSize)
      .maxTimeMS(5000)
      .lean<MemberRow[]>(),
    Post.find({}, { _id: 1, title: 1, author: 1, createdAt: 1 })
      .sort({ createdAt: -1, _id: -1 })
      .skip((currentPostPage - 1) * pageSize)
      .limit(pageSize)
      .maxTimeMS(5000)
      .lean<PostRow[]>(),
  ])

  return {
    memberCount, postCount, members, posts,
    memberPages, postPages, currentMemberPage, currentPostPage,
  }
}
