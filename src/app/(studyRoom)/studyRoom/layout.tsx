import PlusIcon from '@/components/icons/PlusIcon';
import UpdownArrowIcon from '@/components/icons/UpdownArrowIcon';
import { ReactNode } from 'react';

const Layout = (props: { children: ReactNode }) => {
  return (
    <section>
      <div className="bg-[#E3E3FA]">
        <div className="mx-[16px] flex justify-between pb-[17px]">
          <span>스터디룸</span>
          <PlusIcon className="h-5 w-5 fill-black stroke-black" />
        </div>
        <div className="mr-[16px] flex justify-end">
          <div>
            <span className="bg-sub-purple p-2">진행중 3</span>
            <span className="bg-white p-2 text-middle-gray">진행완료</span>
          </div>
        </div>
        <div className="mx-[16px] pb-[20px] pt-[12px]">
          <div className="flex items-center rounded-lg border-light-gray bg-white p-3">
            <UpdownArrowIcon className="h-10 w-5 rounded-lg border-[#EBE9F5] bg-light-purple fill-black" />
            <div>
              <p>피그마 정복하기</p>
              <span>디자인 | 멤버 5</span>
            </div>
            <div className="h-7 rounded-lg border-2 border-sub-purple text-sub-purple">
              <span>D-30</span>
            </div>
          </div>
        </div>
        <ul className="flex justify-evenly border-t-2 border-middle-gray bg-white p-[14px]">
          <li>캘린더</li>
          <li>과제</li>
          <li>채팅</li>
        </ul>
      </div>
      {props.children}
    </section>
  );
};

export default Layout;
