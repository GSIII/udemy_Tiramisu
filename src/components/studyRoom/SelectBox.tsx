'use client';

import { useEffect, useState } from 'react';
import UpdownArrowIcon from '../icons/UpdownArrowIcon';
import { SelectItem } from './SelectItem';

function SelectBox() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<number|undefined>();
  const data = [
    {id: 1, title: '콜로소 1강 완강 인증하기', subtitle: '강의1 화면 캡쳐하기'},
    {id: 2, title: '콜로소 2강 완강 인증하기', subtitle: '강의2 화면 캡쳐하기'},
    {id: 3, title: '콜로소 3강 완강 인증하기', subtitle: '강의3 화면 캡쳐하기'}
  ]

  useEffect(() => {
    setShowModal(false);
  }, [selected]);

  return (
    <>
    <div className='p-[16px] border b-[#E9E9E9] rounded-lg shadow hover:bg-[#efefef] hover:cursor-pointer'  onClick={() => setShowModal(true)}>
      <div className='flex gap-[17px]'>
        <span className='bg-[#F7F3FF] py-[11.5px] border-[#E9E9E9] border rounded-xl'>
          <UpdownArrowIcon />
        </span>
        <div className='flex flex-col'>
          <span className='font-medium'>콜로소 1강 완강 인증하기</span>
          <span className='text-gray-purple text-xs'>강의 화면 캡쳐</span>
        </div>
      </div>
    </div>
    { showModal &&
      <div>
        <div className='bg-[#f9f9f9] px-[14px] rounded-lg border border-[#DFDFDF] pb-[80px]'>
          <div className='text-center text-xl pt-[40px] pb-[28px]'>진행 중인 과제 3</div>
          <div className='bg-white border border-main-purple rounded-lg [&>*:first-child]:border-none'>
            {data.map((item) => {
              return <SelectItem 
                        key={item.id}
                        id={item.id} title={item.title} subtitle={item.subtitle} 
                        selected={selected} setSelected={setSelected}/>
            })}
          </div>
        </div>
      </div>
    }
    </>
  );
}
export default SelectBox;
