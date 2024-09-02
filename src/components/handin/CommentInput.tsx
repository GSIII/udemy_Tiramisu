'use client';
import { useState } from 'react';
import ProfileImg from '../common/ProfileImg'
import SendIcon from '../icons/SendIcon'

const CommentInput = ({prefill, onInsert}: {prefill?: string, onInsert: Function}) => {
  const [comment, setComment] = useState(prefill);
  return (
    <div className='flex bg-white justify-center items-center px-[10px] py-[20px]'>
    {/* <div className='w-[50px] mr-[10px]'>
      <ProfileImg img='./' />
    </div> */}
    <div className='flex-grow-[2] relative'>
      <input 
        type='text' 
        placeholder='스터디원에게 응원의 메세지 보내기' 
        className='border-2 border-light-gray rounded-lg w-full bg-[#F3F3F3] p-[10px]'
        value={comment ? comment : ''}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className='absolute top-1 bottom-1 right-2' onClick={() => onInsert(comment)}>
        <SendIcon />
      </button>
    </div>
  </div>
  )
}
export default CommentInput