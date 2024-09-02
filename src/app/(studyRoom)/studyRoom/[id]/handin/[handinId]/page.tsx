'use client';
import { useState, useEffect } from 'react';
import { HandinType } from '@/components/handin/Handin';
import ProfileImg from '@/components/common/ProfileImg';
import SendIcon from '@/components/icons/SendIcon';
import CommentList from '@/components/handin/CommentList';
import Header from '@/components/handin/Header';
import ToggleMenu from '@/components/handin/ToggleMenu';
import CommentInput from '@/components/handin/CommentInput';
import Image from 'next/image';

const page = ({ params }: { params: { handinId: string }}) => {
  const [handinInfo, setHandinInfo] = useState<any>();
  const [commentList, setCommentList] = useState<any[]>([]);
  const handinId = params.handinId;
  
  const fetchData = async () => { // todo 과제 인증 상세정보와 댓글 정보 같이 끌어오기
    const res = await fetch(`/api/handin?id=${handinId}`);
    const data = await res.json();
    
    setHandinInfo(data[0]);
    setCommentList(data[0].comments);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const dateFormatter = (timestamp: string) => {
    const date = new Date(timestamp).toLocaleString().slice(0,-3);
    return date;
  }
  
  const insertComment = async (comment: any) => {
    const response = await fetch('/api/handin/comments',
      {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({handin_id: handinId, user_id: 'f07001a0-50c1-4393-8124-dc9130e73196', comment: comment})
      });
      const data = await response.json();
      // TODO 렌더링
  }

  const deleteComment = async (selectedComment: any) => {
    const response = await fetch(`/api/handin/comments?id=${selectedComment.id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      console.log('삭제 완료'); // TODO 모달처리
    } else {
      console.log('삭제 실패');
    }
  }

  return (
    <>
    { handinInfo ?
        (
        <div className='h-full'>
          <Header />
          <div className='grid grid-cols-[1fr_7fr_1fr] gap-[8px] border-b-2 border-middle-gray py-[30px]'>
            <div className=''>
              <ProfileImg img={handinInfo.images.url}/>
            </div>
            <div className=''>
              <span>{handinInfo.user.name}</span>
            </div>
            <ToggleMenu
              menus={[{icon: 'edit', label: '수정하기'}, {icon: 'delete', label: '삭제하기'}]}
              onClick={(item: string) => {console.log(item);}}
            />
          </div>
          <div className='bg-[#FAFAFA] py-[60px]'>
            <div className='mb-[30px]'>
              <span>{handinInfo.text}</span>
            </div>
            <div className="mb-[40px] flex aspect-video justify-center rounded-md border-2 border-light-gray">
              <div className={`relative w-full`}>
                  <Image
                      src={handinInfo.images.url}
                      fill={true}
                      alt='image'
                      priority
                      className='object-cover'
                  />
              </div>
            </div>
            <div className="mb-[40px] flex aspect-video justify-center rounded-md border-2 border-light-gray">
              <div className={`relative w-full`}>
                  <Image
                      src={handinInfo.images.url}
                      fill={true}
                      alt='image'
                      priority
                      className='object-cover'
                  />
              </div>
            </div>
            <div className="mb-[40px] flex aspect-video justify-center rounded-md border-2 border-light-gray">
              <div className={`relative w-full`}>
                  <Image
                      src={handinInfo.images.url}
                      fill={true}
                      alt='image'
                      priority
                      className='object-cover'
                  />
              </div>
            </div>
            <span>{dateFormatter(handinInfo.date)}</span>
          </div>
            <div className='sticky bottom-0'>
              <CommentInput onInsert={insertComment}/>
            </div>
            <div>
              <CommentList data={commentList} dateFormatter={dateFormatter} onDelete={deleteComment}/>
            </div>
        </div>
        )
          :
        (
        <div>
          <span>Loading</span>
        </div>
        )
    }
    </>
  )
}
export default page