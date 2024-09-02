'use client';
import { useState } from 'react';
import Button from '../common/Button';
import CheckSign from '../handin/CheckSign';

type TSelectModal = {
    data: [];
    onConfirm: Function;
    onCancel: Function;
}

const SelectModal = ({data, onConfirm, onCancel}: TSelectModal) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const dateFormatter = (timestamp: string) => {
        const date = new Date(timestamp).toLocaleDateString().slice(0,-1);
        return date;
      }
    
  return (
    <>
    <div className='relative bg-[#f9f9f9] rounded-lg p-5'>
        {data && 
            data.map((item) => {
                return (
                    <div key={item.id} className='flex bg-white border-2 border-light-gray rounded-md drop-shadow-md m-[8px]' onClick={() => setSelectedItem(item)}>
                        <div className='flex flex-col justify-center flex-grow p-[16px]'>
                            <span className='text-base font-medium mb-[2px]'>{item.title}</span>
                            <span className='text-xs text-gray-purple'>{item.subtitle}</span>
                            <span className='text-xs text-gray-purple'>{`${dateFormatter(item.startDate)} ~ ${dateFormatter(item.endDate)}`}</span>
                        </div>
                        {selectedItem &&
                            <div className={`${selectedItem.id === item.id ? '' : 'hidden'} m-auto mr-[20px]`}>
                                <CheckSign fill='fill-main-purple' background='bg-white' border='bg-main-purple' size='small'/>
                            </div>
                        }
                  </div>
                )
            })
        }
        <div className='flex'>
            <Button type='primary' label='확인' onClick={() => onConfirm(selectedItem)}/>
            <Button label='취소' onClick={() => onCancel()}/>
        </div>
    </div>
    </>
  )
}
export default SelectModal