'use client';

import supabase from '@/utils/supabase/client';

export default function Notes() {
  const addPosts = async () => {
    try {
      const { data, error } = await supabase()
        .from('user')
        .insert({ name: '홍길동' });

      if (data) {
        console.log(data);
      }

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.');
    }
  };

  const updatePosts = async () => {
    try {
      const { data, error } = await supabase
        .from('user')
        .update({ name: '황준용' })
        .eq('id', 29);

      if (data) {
        console.log(data);
      }

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.');
    }
  };

  const deletePosts = async () => {
    try {
      const { data, error } = await supabase
        .from('user')
        .delete({ name: '황준용' })
        .eq('id', 29);

      if (data) {
        console.log(data);
      }

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.');
    }
  };

  return (
    <>
      <button type="button" onClick={() => addPosts()}>
        버튼
      </button>
      <br />
      <button type="button" onClick={() => updatePosts()}>
        업데이트
      </button>
      <br />
      <button type="button" onClick={() => deletePosts()}>
        삭제
      </button>
    </>
  );
}
