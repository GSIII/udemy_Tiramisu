import supabase from '@/utils/supabase/client';

export const addProfile = async (
  job: string,
  goals: string[],
  introductions: string[],
  studySpan: string,
  router: any,
) => {
  try {
    const { data, error } = await supabase
      .from('profile')
      .insert({
        job,
        goal: goals,
        introduction: introductions,
        exp_study_span: studySpan,
      })
      .select(); // insert 만으로는 data를 반환하지 않음 select를 추가해서 저장한 데이터를 반환
    console.log('profile added', data);
    if (data) {
      router.push('/profile/success');
    }
    if (error) throw error;
  } catch (error) {
    console.error('error adding profile', error);
    alert('프로필을 추가하는 중 오류가 발생했습니다. ');
  }
};
