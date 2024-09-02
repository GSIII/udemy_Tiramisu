'use client';

import { useState } from 'react';

import ProfileImg from '../common/ProfileImg';
import CommentForm from './CommentForm';
import DropDownMenu from './DropDownMenu';

export default function Comment() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="border-x border-b border-[#efefef] bg-[#FAFAFA] bg-opacity-45 p-[18px]">
      <div className="flex gap-[12px]">
        <div>
          <ProfileImg />
        </div>
        {!isEdit ? (
          <div className="flex flex-col gap-[4px]">
            <div className='flex justify-between relative flex-nowrap'>
              <div className="flex items-center">
                <span className="mr-[7px] font-bold">테디</span>
                <span className="text-xs text-[#898989]">6월 5일 오후 8:04</span>
              </div>
              <DropDownMenu menus={['수정하기', '삭제하기']}/>
            </div>
            <span className="break-all text-sm">
              처음부터 끝까지 봤는데, 정말 꼼꼼하게 잘하셨네요! 피드백 할 부분이
              없는데요! 잘 보고 가요 {`:>`}
            </span>
          </div>
        ) : (
          // <input type="text" className="w-full rounded-lg bg-[#f3f3f3]" />
          <div className="w-full">
            <CommentForm
              preValue="잘 보고 가요"
              showEdit={isEdit}
              setShowEdit={setIsEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
}
