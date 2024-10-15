import { NextRequest, NextResponse } from 'next/server';

import getExpeditions from '@/lib/data/get-expeditions';

export async function GET(request: NextRequest) {
  const response = await getExpeditions(request.nextUrl.searchParams);

  return NextResponse.json(response, { status: 200 });
}
