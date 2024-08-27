'use client';

import { useState } from 'react';
import MoreIcon from '../icons/MoreIcon'

const MoreCircles = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        setIsClicked(!isClicked);
    }

    const handleShowModal = (type: string) => {
        console.log(type);
        console.log('show modal');
        setShowModal(true);
        setModalType(type);
    }

  return (
    <>
    {isClicked ? (
        <button onClick={handleClick}>
            <MoreIcon className='h-7 w-7 fill-black stroke-black' />
            <ul>
              <li>수정</li>
              <li>삭제</li>
            </ul>
        </button>
    ) : (
      <button onClick={handleClick}>
        <MoreIcon className='h-7 w-7 fill-black stroke-black' />
      </button>
    )}
    </>
    )
}
export default MoreCircles