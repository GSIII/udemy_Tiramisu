'use client';
import CalendarIcon from '../icons/CalendarIcon';
import LeftArrowIcon from '../icons/LeftArrowIcon';

const HandinHeader = ({title}: {title: string}) => {
  return (
    <>
    <header className="border-b-2 pb-2 mt-8">
        <div className="flex justify-between mx-8">
        <LeftArrowIcon className='w-3 h-3 stroke-black' />
        <span>{title}</span>
        <CalendarIcon className='w-5 h-5 fill-white stroke-black'/>
        </div>
    </header>
    </>
  )
}
export default HandinHeader;