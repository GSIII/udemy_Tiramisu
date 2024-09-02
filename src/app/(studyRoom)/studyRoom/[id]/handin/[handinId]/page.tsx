'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import ProfileImg from '@/components/common/ProfileImg';
import Header from '@/components/handin/Header';
import CommentForm from '@/components/handin/CommentForm';
import Comment from '@/components/handin/Comment';
import HandinDetail from '@/components/handin/HandinDetail';
import CommentList from '@/components/handin/CommentList';

function Page({ params }: { params: { handinId: string } }) {
  const [handinInfo, setHandinInfo] = useState<any>();
  const [commentList, setCommentList] = useState<any[]>([]);
  const { handinId } = params;

  const fetchData = async () => {
    // todo 과제 인증 상세정보와 댓글 정보 같이 끌어오기
    const res = await fetch(`/api/handin?id=${handinId}`);
    const data = await res.json();

    setHandinInfo(data[0]);
    setCommentList(data[0].comments);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dateFormatter = (timestamp: string) => {
    const date = new Date(timestamp).toLocaleString().slice(0, -3);
    return date;
  };

  const insertComment = async (comment: any) => {
    const response = await fetch('/api/handin/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        handin_id: handinId,
        user_id: 'f07001a0-50c1-4393-8124-dc9130e73196',
        comment,
      }),
    });
    const data = await response.json();
    // TODO 렌더링
  };

  const deleteComment = async (selectedComment: object) => {
    const response = await fetch(
      `/api/handin/comments?id=${selectedComment.id}`,
      {
        method: 'DELETE',
      },
    );
    // if (response.ok) {
    //   console.log('삭제 완료'); // TODO 모달처리
    // } else {
    //   console.log('삭제 실패');
    // }
  };

  return (
    <>
      {handinInfo ? (
        <div className="h-full">
          <Header />
          <HandinDetail />
          <div className="flex w-full sticky bottom-0 justify-center items-center gap-[12px] px-[18px] py-[20px] bg-white border-[#efefef] border-t">
            <ProfileImg />
            <span className='flex-grow'>
              <CommentForm />
            </span>
          </div>
          <CommentList />
        </div>
      ) : (
        <div>
          <span>Loading</span>
        </div>
      )}
    </>
  );
}
export default Page;
