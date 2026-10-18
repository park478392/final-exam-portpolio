import { Types } from 'mongoose'
import { connectDB } from '@/lib/mongodb'
import { Post } from '@/models/Post'
export type PostDTO = {
  id: string
  title: string
  content: string
  author: string
  createdAt: string
  views: number
}
type RawPost = {
  _id: Types.ObjectId
  title: string
  content: string
  author: string
  createdAt: Date
  views?: number
}
function toPost(d: RawPost): PostDTO {
  return {
    id: String(d._id),
    title: d.title,
    content: d.content,
    author: d.author,
    createdAt: new Date(d.createdAt).toISOString(),
    views: d.views ?? 0,
  }
}
export async function getPosts(): Promise<PostDTO[]> {
  await connectDB()
  const docs = await Post.find().sort({ createdAt: -1 }).limit(50).lean()
  return docs.map((d) => toPost(d))
}
export async function getPost(id: string): Promise<PostDTO | undefined> {
  if (!Types.ObjectId.isValid(id)) return
  await connectDB()
  const doc = await Post.findById(id).lean()
  return doc ? toPost(doc) : undefined
}
export async function createPost(data: {
  title: string
  content: string
  author: string
  authorId: string
}) {
  await connectDB()
  const doc = await Post.create(data)
  return toPost(doc)
}
