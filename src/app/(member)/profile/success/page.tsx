import supabase from '@/utils/supabase/client';

export default async function ProfileSuccess() {
  const { data, error } = await supabase.from('profile').select('job');
  return (
    <>
      <h1>ProfileSuccess</h1>
      {JSON.stringify(data)}
    </>
  );
}
