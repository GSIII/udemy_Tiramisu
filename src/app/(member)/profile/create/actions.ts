import supabase from '@/utils/supabase/client';

// 하드코딩된 userId
const userId = '';

export const addProfile = async (
  job: string,
  purposes: string[],
  personalities: string[],
  studySpan: string,
  router: any,
) => {
  try {
    // 기존 프로필 확인 후
    const { data: existingProfile, error: fetchError } = await supabase
      .from('user')
      .select('id')
      .eq('id', userId)
      .single();

    if (fetchError) throw fetchError;

    if (existingProfile) {
      // 기존 프로필이 있으면 업데이트하거나 삽입
      const { data, error } = await supabase
        .from('user')
        .upsert({
          id: userId, // 하드코딩된 UUID
          job,
          purpose: purposes,
          personality: personalities,
          expected_study_span: studySpan,
        })
        .select(); // 데이터 반환을 위해 select 추가

      if (error) throw error;

      console.log('profile added or updated', data);
      router.push('/profile/success');
    } else {
      alert('해당 사용자 ID에 대한 프로필이 존재하지 않습니다.');
    }
  } catch (error) {
    console.error('error adding or updating profile', error);
    alert('프로필을 추가하거나 업데이트하는 중 오류가 발생했습니다.');
  }
};
