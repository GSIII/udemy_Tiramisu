import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/utils/supabase/client';

export async function POST (req: NextRequest) {
    const body = await req.json();

    const { data, error } = await supabase.from('reactions')
        .upsert({target_id: body.target_id, user_id: body.user_id, reactions: body.reactions}, {onConflict: 'target_id'})
        .select();

    if (error) {
        return NextResponse.json({error: error});
    }
  
    return NextResponse.json(data);
}