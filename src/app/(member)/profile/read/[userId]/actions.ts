import supabase from '@/utils/supabase/client';

export const getSpecificColumns = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user') // 테이블 이름
      .select('id, job, purpose') // 선택할 열만 지정
      .eq('id', userId) // 조건 설정
      .single(); // 단일 행 가져오기

    if (error) throw error;

    console.log('Specific columns data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching specific columns:', error);
    throw error;
  }
};
