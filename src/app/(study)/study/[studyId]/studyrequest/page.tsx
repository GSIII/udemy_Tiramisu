'use client';
import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase/client';
import Footer from '@/components/study/Footer';
import { useRouter } from 'next/navigation';

function WaitingRequestpage() {
  const [applydata, setApplydata] = useState(null);
  const fullmember = true;
  const router = useRouter();

  const modApply = async (id, status) => {
    console.log(id, status);

    const { data, error } = await supabase
      .from('study_apply')
      .update({ status: status })
      .eq('id', id);

    if (error) {
      console.error('Error updating apply status:', error);
    } else {
      console.log('Update successful:', data);
      getApply();

      if (fullmember) {
        const { data, error } = await supabase
          .from('studyroom')
          .insert({ studyId: 83 });
        alert('스터디룸이 생성되었습니다.');
        router.push(`/studyRoom`);
      }
    }
  };

  const getApply = async () => {
    try {
      const { data, error } = await supabase
        .from('study_apply')
        .select(`*, user (id, name, email)`);

      if (error) {
        throw error;
      }

      function groupByDate(data) {
        return data.reverse().reduce((result, item) => {
          // 대기
          if (item.status === 'wating') {
            const date = item.created_at.split('T')[0];

            if (!result[date]) {
              result[date] = [];
            }

            result[date].push(item);
          }
          return result;
        }, {});
      }

      const groupedData = groupByDate(data);

      setApplydata(groupedData);
      console.log(groupedData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getApply();
  }, []);

  return (
    <>
      <div className="flex flex-col px-2">
        {applydata ? (
          <>
            {Object.entries(applydata).map(([date, items]) => (
              // date
              <div key={date}>
                <div className="font mb-4 text-sm font-medium text-dark-gray">
                  {date}
                </div>
                {/* list */}
                <ul className="mb-4 flex flex-col gap-4">
                  {items.map((apply) => (
                    <li key={apply.id}>
                      {apply.status === 'wating' && (
                        <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 p-5">
                          <div className="flex w-full items-start justify-between gap-4 p-5">
                            <div className="flex items-start justify-start gap-2.5">
                              <div className="flex flex-col items-end justify-start">
                                <img
                                  className="h-14 w-14 rounded-full"
                                  src="https://th.bing.com/th/id/OIG3.Z11n1VN6NRw.IXOddq9X?w=1024&h=1024&rs=1&pid=ImgDetMain"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-start gap-1">
                                <div className="text-base font-semibold text-black">
                                  제이크
                                </div>
                                <div className="text-xs font-medium text-gray-500">
                                  기획자
                                </div>
                                <div>
                                  <span
                                    className={
                                      'text-xs font-medium text-gray-500'
                                    }
                                  >
                                    스터디{' '}
                                  </span>
                                  <span className="text-xs font-medium text-indigo-500">
                                    8회
                                  </span>
                                  <span className="text-xs font-medium text-gray-500">
                                    {' '}
                                    | 출석률{' '}
                                  </span>
                                  <span className="text-xs font-medium text-indigo-500">
                                    98%
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start justify-start gap-1.5">
                              <button
                                type="button"
                                onClick={() => modApply(apply.id, 'refused')}
                                className="flex items-center justify-center gap-2 rounded-full bg-light-gray px-4 py-2 text-sm font-medium text-dark-gray"
                              >
                                거절
                              </button>
                              <button
                                type="button"
                                onClick={() => modApply(apply.id, 'accepted')}
                                className="flex items-center justify-center gap-2 rounded-full bg-main-purple px-4 py-2 text-sm font-medium text-white"
                              >
                                수락
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col items-start justify-start gap-4">
                            <div className="h-10 w-full px-6 text-sm font-normal leading-tight text-dark-gray">
                              안녕하세요, 개발 관련 글을 꾸준히 쓰고 싶은데
                              의지가 부족해 스터디 버디들을 구하고 싶습니다
                              화이팅🔥
                            </div>
                            <div className="flex items-start justify-start gap-2.5 px-6">
                              <div className="flex items-center justify-center gap-2.5 rounded-lg bg-light-purple p-2.5">
                                <div className="text-xs font-normal text-dark-gray">
                                  손이 빠름
                                </div>
                              </div>
                              <div className="flex items-center justify-center gap-2.5 rounded-lg bg-light-purple p-2.5">
                                <div className="text-xs font-normal text-dark-gray">
                                  열정적
                                </div>
                              </div>
                              <div className="flex items-center justify-center gap-2.5 rounded-lg bg-light-purple p-2.5">
                                <div className="text-xs font-normal text-dark-gray">
                                  동기부여가 필요한
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* {apply.status && (
                        <>
                          <div>{apply.id}</div>
                          <div>
                            <button>승인됨</button>
                          </div>
                        </>
                      )} */}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
      <Footer />
    </>
  );
}

export default WaitingRequestpage;
