import { NextRequest, NextResponse } from 'next/server';

import supabase from '@/utils/supabase/client';

export async function GET(req: NextRequest) {
  try {
    let query = supabase.from('homework').select().order('created_at');
    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');
    if (id) {
      query = query.eq('studyId', id);
    }

    const { data, error } = await query;
    if (error) {
      throw new Error(`get homework has an error. ${error}`);
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
