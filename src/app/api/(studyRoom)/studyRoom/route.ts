import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/utils/supabase/client';

export async function GET(req: NextRequest) {
  try {
    const userId = 'e61659b6-8b37-4c47-ade5-0bb2530845f2'; // 스터디룸 있음
    // const userId = 'daba5bf3-198f-4a2c-a7fc-aefbe921434f'; // 스터디룸 없음
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}
