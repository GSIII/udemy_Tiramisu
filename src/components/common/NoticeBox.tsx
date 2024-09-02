import RightArrowIcon from '../icons/RightArrowIcon';

const NoticeBox = () => {
  return (
    <>
      <div className="flex items-center h-[50px] text-center rounded-lg border-2 border-[#EBE9F5] bg-[#F7F3FF] p-[16px] drop-shadow-sm hover:cursor-pointer">
        <div className="flex flex-grow">
          <span className="mr-[8px]">😎</span>
          <span className='w-full text-start'>우리는 이렇게 인증해요 !</span>
          <RightArrowIcon className='h-4 w-4 m-auto'/>
        </div>
      </div>
    </>
  );
};
export default NoticeBox;
