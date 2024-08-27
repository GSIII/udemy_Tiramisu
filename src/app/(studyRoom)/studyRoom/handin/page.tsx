'use client';
import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase/client';
import Handin from '@/components/handin/Handin';
import Button from '@/components/common/Button';

const page = () => {
  const [handinList, setHandinList] = useState<any[]>([])
  const fetchData = async () => {
    const {data} = await supabase.from('handin').select(`
      id,
      text,
      created_at,
      images ( url ),
      user ( name )`)
      .order('created_at', { ascending: false });
    setHandinList(data || []);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#FAFAFA]">
      <div className="border-b-2 border-middle-gray p-[34px]">
        <p>과제 일정</p>
        <p>주차별 과제 현황을 확인하고 소통해요.</p>
        <div className="rounded-lg bg-light-purple p-3">
          <p>우리는 이렇게 소통해요</p>
        </div>
      </div>
      <div className="p-[13px]">
        <p>6월</p>
        캘린더 영역
      </div>
      <div className="rounded-md bg-white">
        <div className="border-b-2 border-middle-gray pb-[24px] pt-[37px]">
          <p>6월 4일 화요일</p>
          <p>과제를 인증한 팀원들을 확인해 보세요.</p>
        </div>
        <div>
          {handinList.map((data) => (
            <Handin
              key={data.id}
              id={data.id}
              userName={data.user.name}
              handinImg={data.images.url}
              text={data.text}
              date={data.created_at}
            />
          ))}
          <div className='text-center'>
            <Button primary={false} label='과제 인증하기' size='large' borderStyle='border-dotted'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
