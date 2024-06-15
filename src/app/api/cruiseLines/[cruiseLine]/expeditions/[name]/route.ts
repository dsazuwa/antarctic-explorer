import { NextRequest, NextResponse } from 'next/server';

import { getExpedition } from '@/lib/data/expedition';

export async function GET(
  request: NextRequest,
  {
    params: { cruiseLine, name },
  }: { params: { cruiseLine: string; name: string } },
) {
  const response = await getExpedition(cruiseLine, name);

  return NextResponse.json(response, { status: 200 });
}
