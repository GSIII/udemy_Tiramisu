'use client';
import Link from 'next/link';
import Button from '@/components/common/Button';
import { useParams, usePathname, useRouter } from 'next/navigation';
import supabase from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { getacceptedApplyUser } from '@/hooks/useStudy';

export default function Footer() {
  const accessNum = getacceptedApplyUser();
  console.log(accessNum);
  const isLeader = true;
  // const isLeader = false;
  const params = useParams();
  const path = usePathname();
  const displayRequest = path.endsWith('studyrequest');
  console.log(params.studyId);

  const postApply = async () => {
    try {
      const { data, error } = await supabase.from('study_apply').insert([
        {
          // 요청 페이지 id
          studyId: params.studyId,
          // userId: '705bccf5-d3f9-4aac-9bbb-582a5edcab87',
          userId: '10669baa-7476-4f40-8bbf-37ba8765de74',
          status: 'wating',
        },
      ]);
    } catch (error) {
      alert('예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.');
    }
  };

  let btnText =
    isLeader && !displayRequest && accessNum.length === 0
      ? '아직 대기 인원이 없습니다'
      : '대기 중인 요청 확인';
  let btnbg =
    isLeader && !displayRequest && accessNum.length === 0
      ? '#d0d6e0'
      : '대기 중인 요청 확인';

  return (
    <>
      <div className="fixed bottom-0 mx-auto h-[#104px] w-full max-w-[600px] items-center justify-center px-4">
        <div className="flex w-full items-center justify-center gap-5 bg-white py-4 text-[14px]">
          <div className="flex w-full flex-col items-center">
            <p className="text-[14px]">참여가능인원</p>
            <p className="text-bold text-[18px]">
              <span
                className={`${accessNum.length === 0 ? 'text-middle-gray' : 'text-main-purple'}`}
              >
                {accessNum.length}명
              </span>
              <span className="text-dark-gray"> / 4명</span>
            </p>
          </div>

          <div className="flex w-full items-center justify-center">
            {isLeader && !displayRequest && (
              <Link href={`${params.studyId}/studyrequest`}>
                <Button primary label={btnText} size="large"></Button>
              </Link>
            )}
            {isLeader && displayRequest && (
              <Link href={`${params.studyId}/studyrequest`}>
                <Button primary label={'전체 수락'} size="large"></Button>
              </Link>
            )}
            {/* TODO: 스터디원 => 요청(상태)*/}
            {!isLeader && (
              <>
                <button
                  type="button"
                  // primary
                  // label="참가 요청"
                  onClick={() => postApply()}
                >
                  참가요청
                </button>
                {/* <Button
                     primary
                     label="참가 요청"
                     onClick={() => postApply()}
                   ></Button> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
