import { NextRequest, NextResponse } from 'next/server';

import supabase from '@/utils/supabase/client';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data, error } = await supabase
    .from('images')
    .insert({ url: body.url })
    .select();
  if (error) {
    return NextResponse.json({ error });
  }

  return NextResponse.json(data);
}
