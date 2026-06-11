/**
 * API route mock cho kiểm tra bài viết
 * Production: gọi LLM để phân tích grammar, coherence, lexical resource
 */

import { NextRequest, NextResponse } from 'next/server';
import { getMockWritingCheck } from '@/features/writing/mocks/mock-writing-check';

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text || text.trim().length < 10) {
    return NextResponse.json({ error: 'Text too short' }, { status: 400 });
  }

  // Giả lập độ trễ API
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const result = getMockWritingCheck(text);
  return NextResponse.json(result);
}
