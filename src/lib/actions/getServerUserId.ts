'use server';

import supabaseServer from '@/utils/supabase/server';

export async function getServerUserId() {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id;
}
