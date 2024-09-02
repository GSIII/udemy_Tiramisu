import ProfileImg from '../common/ProfileImg';
import CheckSignIcon from '../icons/CheckSignIcon';
import DropDownMenu from './DropDownMenu';

export default function HandinDetail() {
  return (
    <div>
      <div>
        <div className="flex justify-between p-[16px]">
          <div className="flex items-center flex-grow flex-shrink-0">
            <ProfileImg />
            <span className="ml-[8px] font-bold">김서희</span>
          </div>
          <div className='flex relative w-full items-center justify-end gap-[24px]'>
            <div className='flex items-center'>
              <span className="mr-[4px] text-sm text-gray-purple">
                사진으로 인증됨
              </span>
              <CheckSignIcon />
            </div>
            <DropDownMenu menus={['수정하기', '삭제하기']}/>
          </div>
        </div>
      </div>
      <div className="border-b border-t border-[#E6E6E6] bg-[#FAFAFA] p-[16px]">
        <div className="mb-[60px] mt-[67px]">
          <span className="block break-all">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore
            illum repudiandae laudantium neque at ex optio quos culpa impedit
            quia praesentium, adipisci totam, similique quas esse, aperiam
            sapiente necessitatibus est.
          </span>
        </div>
        <div className="mb-[20px]">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Example_image.svg"
            alt=""
          />
        </div>
        <div className="mb-[20px]">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/8f/Example_image.svg"
            alt=""
          />
        </div>
        <div className="flex items-center gap-[5px] text-xs text-[#636363]">
          <span>오전 9:00</span>
          <svg
            width="2"
            height="2"
            viewBox="0 0 2 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="1" cy="1" r="1" fill="#636363" />
          </svg>
          <span>2024.6.4</span>
          <svg
            width="2"
            height="2"
            viewBox="0 0 2 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="1" cy="1" r="1" fill="#636363" />
          </svg>
          <span>14일차 과제</span>
        </div>
      </div>
    </div>
  );
}
