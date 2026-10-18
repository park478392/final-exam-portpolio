import { NextResponse } from 'next/server'
export function GET() {
  return NextResponse.json({
    message: 'Hello from Next.js Route Handler',
    course: '웹서버보안프로그래밍',
    weeks: 7,
  })
}
