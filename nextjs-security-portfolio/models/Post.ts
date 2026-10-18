import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from 'mongoose'
const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    content: { type: String, required: true, maxlength: 10000 },
    author: { type: String, required: true, trim: true },
    authorId: { type: String, required: true },
    views: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true },
)
type PostDocument = InferSchemaType<typeof postSchema>
export const Post =
  (models.Post as Model<PostDocument> | undefined) ??
  model<PostDocument>('Post', postSchema)
