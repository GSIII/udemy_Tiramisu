import { ChangeEvent, useRef, useState } from 'react';

import Button from '../common/Button';
import Mark from '../common/Mark';
import NoticeBox from '../common/NoticeBox';
import SelectBox from '../studyRoom/SelectBox';
import HandinImage from './HandinImage';
import { useFormState, useFormStatus } from 'react-dom';
import { createHandin } from '@/lib/actions/createHandin';

const initialState = {
  success: false,
};

export default function HandinForm() {
  const [state, formAction] = useFormState(createHandin, initialState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [images, setImages] = useState<[]>();
  const { pending } = useFormStatus();

  if (formRef.current && state.success) {
    formRef.current.reset();
  }

  const handleFileClick = () => {
    fileInputRef.current?.click();
  }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImages = [];
    const files = e.target.files;
    if (files && files.length < 3) {
      const reader = new FileReader();
      for (let i=0; i<files.length; i++) {
        const file = files[i];
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          newImages.push(e.target!.result as string);
        };
      }
      setImages(newImages);
    }
  }

  return (
    <div className="p-[16px]">
      <NoticeBox />
      <div className="flex items-center gap-[12px] pb-[16px] pt-[34px]">
        <span className="items-center justify-center gap-[12px] text-lg font-medium">
          14일차 과제
        </span>
        <Mark label={'진행중'} />
      </div>
      <div className="pb-[24px]">
        <SelectBox />
      </div>
      <div onClick={() => handleFileClick()}>
        <HandinImage />
      </div>
      <form action={formAction} ref={formRef}>
        <input type="text" name='id' className='hidden'/>
        <input type="text" name='homeworkId' className='hidden'/>
        <input 
          type="file"
          name='file' 
          className='hidden'
          accept='image/*'
          ref={fileInputRef}
          multiple
          onChange={(e) => handleFileChange(e)}
        />
        <div className='flex flex-col gap-[12px]'>
          <label htmlFor="text" className='block font-bold'>기록</label>
          <input
            required
            type="text"
            name="text"
            placeholder="과제를 하며 나누고 싶은 생각을 적어보세요."
            className={`w-full rounded-lg bg-[#f3f3f3] border-[#E9E9E9] border text-sm placeholder-gray-purple focus:outline-none px-[14px] py-[11.5px]`}
          />
          <span className='text-xs text-[#9d9d9d] self-end mr-[2px]'>0 / 500</span>
        </div>
        { !pending ? (
          <div className='mt-[40px]'>
            <Button type='primary' buttonType='submit' label='인증하기'></Button>
          </div>
        ) : (
          <div>Pending</div>
        ) }
      </form>
      <div>
        {images?.map(image => {
          return <img src={image} alt="" />
        })}
      </div>
    </div>
  );
}