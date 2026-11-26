import type { FilterQuery, Types } from 'mongoose'
import {
  defaultBoardCategory,
  isBoardCategory,
  type BoardCategory,
} from '@/lib/board-categories'
import { connectDB } from '@/lib/mongodb'
import { Post } from '@/models/Post'

type RawPostSummary = {
  _id: Types.ObjectId
  title: string
  category?: string | null
  author: string
  createdAt: Date
}

type PostFields = { title: string; content: string; category: BoardCategory }
type BoardSearchField = 'title' | 'content' | 'author'

export function isBoardSearchField(value: unknown): value is BoardSearchField {
  return value === 'title' || value === 'content' || value === 'author'
}

export function isPostId(value: unknown): value is string {
  return typeof value === 'string' && /^[a-f\d]{24}$/i.test(value)
}

function toSummary(doc: RawPostSummary) {
  return {
    id: String(doc._id),
    title: doc.title,
    category: isBoardCategory(doc.category) ? doc.category : defaultBoardCategory,
    author: doc.author,
    createdAt: doc.createdAt.toISOString(),
  }
}

export async function getPosts({
  category,
  field,
  query,
  page,
}: {
  category?: BoardCategory
  field: BoardSearchField
  query: string
  page: number
}) {
  await connectDB()
  const pageSize = 10
  const filter: FilterQuery<RawPostSummary & { content: string }> = {}

  if (category === defaultBoardCategory) {
    filter.category = { $in: [category, null, ''] }
  } else if (category) {
    filter.category = category
  }

  if (query) {
    const literal = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    filter[field] = { $regex: literal, $options: 'i' }
  }

  const total = await Post.countDocuments(filter).maxTimeMS(5000)
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const currentPage = Math.min(page, pageCount)
  const offset = (currentPage - 1) * pageSize
  const docs = await Post.find(filter)
    .select('title category author createdAt')
    .sort({ createdAt: -1, _id: -1 })
    .skip(offset)
    .limit(pageSize)
    .maxTimeMS(5000)
    .lean()

  return { posts: docs.map(toSummary), total, pageCount, currentPage, offset }
}

export async function getPost(id: string) {
  if (!isPostId(id)) return
  await connectDB()
  const doc = await Post.findById(id).maxTimeMS(5000).lean()
  return doc && {
    ...toSummary(doc),
    content: doc.content,
    authorId: doc.authorId,
  }
}

export async function createPost(data: PostFields & { author: string; authorId: string }) {
  await connectDB()
  const doc = await Post.create(data)
  return String(doc._id)
}

export async function updateOwnedPost(id: string, authorId: string, data: PostFields) {
  await connectDB()
  const result = await Post.updateOne(
    { _id: id, authorId },
    { $set: data },
    { runValidators: true },
  ).maxTimeMS(5000)
  return result.matchedCount === 1
}

export async function deleteOwnedPost(id: string, authorId: string) {
  await connectDB()
  const result = await Post.deleteOne({ _id: id, authorId }).maxTimeMS(5000)
  return result.deletedCount === 1
}
