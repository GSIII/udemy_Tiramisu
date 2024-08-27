'use client';
import { useParams } from 'next/navigation';
import { getStudy } from '@/hooks/useStudy';

export default function StudyDetail() {
  const params = useParams();
  const study = getStudy(params.studyId);

  return (
    <>
      {study && (
        <div className="relative">
          <div className="flex flex-col gap-8 p-4">
            <header className="flex flex-col gap-2 border-b-2 border-light-gray pb-4">
              <div className="mb-2 flex w-full items-center gap-4">
                <p className="text-[24px] font-bold">{study.title}</p>
                <span className="rounded-full border-[1px] border-sub-purple px-2 py-1 text-[14px] text-sub-purple">
                  {`D - ${(new Date(study.endDate) - new Date(study.startDate)) / 1000 / 60 / 60 / 24}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  className="h-[38px] w-[38px] rounded-full"
                  src="https://th.bing.com/th/id/OIG3.6Q6JSjGGulke2mGv6MPj?pid=ImgGn"
                  alt="Profile"
                />
                <div className="flex w-full flex-col text-gray-purple">
                  <p className="flex text-[13px] font-semibold">Study Leader</p>
                  <div className="flex w-full justify-between">
                    <span className="text-[12px] text-[#82829B]">
                      작성일 {study.created_at} | 조회수 {study.viewCount}
                    </span>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex flex-col gap-8">
              <div className="flex flex-col gap-4 text-[#434343]">
                <p className="font-semibold">스터디 주제</p>
                <p className="whitespace-pre text-[15px]">{study.info}</p>
              </div>
              <div className="flex flex-col gap-4 text-[#434343]">
                <p className="font-semibold">스터디 목표</p>
                <p className="text-[15px]">{study.goal}</p>
              </div>
              <div className="flex flex-col gap-4 text-[#434343]">
                <p className="font-semibold">스터디 인원</p>
                <p className="text-[15px]">{study.recruitNum} 명</p>
              </div>
              <div className="flex flex-col gap-4 text-[#434343]">
                <p className="font-semibold">스터디 기간</p>
                <p className="text-[15px]">
                  <span>{/* 스터디 기간을 여기에 표시 */}</span>
                </p>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
