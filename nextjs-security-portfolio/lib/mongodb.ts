import mongoose from 'mongoose'
declare global {
  var portfolioMongoConnection: Promise<typeof mongoose> | undefined
}
const connectionWaitMS = 5000

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose

  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI not configured')

  const connection = globalThis.portfolioMongoConnection ??= mongoose.connect(uri, {
    bufferCommands: false,
    serverSelectionTimeoutMS: connectionWaitMS,
    connectTimeoutMS: 3500,
  }).finally(() => {
    globalThis.portfolioMongoConnection = undefined
  })

  // SRV resolution can take longer than the driver's server selection timeout.
  // Bound the caller's wait while concurrent requests share the same attempt.
  let timer: ReturnType<typeof setTimeout> | undefined
  try {
    return await Promise.race([
      connection,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => {
          reject(Object.assign(new Error('MongoDB connection wait timed out'), {
            code: 'MONGODB_CONNECTION_WAIT_TIMEOUT',
          }))
        }, connectionWaitMS)
      }),
    ])
  } finally {
    clearTimeout(timer)
  }
}
