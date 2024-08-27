import ThinkingFace from '@/assets/ThinkingFace.png';
import Wavinghand from '@/assets/Wavinghand.png';
import Link from 'next/link';
import Image from 'next/image';

export default function StudyPage() {
  return (
    <>
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="break-words text-[18px] font-bold">
          아직 스터디룸이
          <br /> 존재하지 않아요!
        </h1>
        <p className="text-gray-purple">#원하는 스터디 룸을 탐색해 볼까요?</p>
      </div>
      {/* banner */}
      <div className="flex flex-col gap-4">
        <div className="flex w-full rounded-lg bg-light-gray px-5 pb-[21px] pt-[30px]">
          <div className="flex w-full flex-col items-start justify-start gap-3">
            <div className="flex flex-col items-start justify-start gap-1">
              <div className="text-sm font-medium text-[#81819b]">
                밋티의 맞춤형 스터디를 탐색해보세요!
              </div>
              <div className="text-lg font-bold text-black">
                스터디 탐색하기
              </div>
            </div>
            <div className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e3e3fa] p-2">
              <Link href={'/search'}>
                <div className="text-center text-xs font-semibold text-[#3a436c]">
                  바로가기
                </div>
              </Link>
            </div>
          </div>
          <div className="flex w-24 items-center justify-center object-cover">
            <Image
              src={ThinkingFace}
              width={72}
              height={72}
              alt={'ThinkingFace'}
            />
          </div>
          {/* </div> */}
        </div>
        <Link href={'/study/write'}>
          <div className="flex w-full rounded-lg bg-[#f5f1ff] p-6">
            <div className="flex w-full flex-col items-start justify-start gap-1">
              <div className="font-['Pretendard'] text-xs font-normal leading-none text-[#81819b]">
                찾으시는 스터디 룸이 없으신가요?
              </div>
              <div className="font-['Pretendard'] text-sm font-semibold leading-tight text-black">
                쉽고 빠른 스터디룸 개설하기
              </div>
            </div>
            <div className="flex w-24 items-center justify-center object-cover">
              <Image
                src={Wavinghand}
                width={72}
                height={72}
                alt={'ThinkingFace'}
              />
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
