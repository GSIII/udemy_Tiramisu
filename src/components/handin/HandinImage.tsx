import PlusIcon from '../icons/PlusIcon';

export default function HandinImage() {
  return (
    <div className="flex aspect-video justify-center overflow-hidden rounded-lg border-2 border-[#E9E9E9] bg-[#f9f9f9] hover:cursor-pointer shadow-md hover:bg-[#dfdfdf] mb-[40px]">
    <div className='flex flex-col gap-[8px] justify-center items-center'>
      <div className='rounded-full bg-[#eaeaea] p-[8px]'>
        <span className="">
          <PlusIcon />
        </span>
      </div>
      <div>
        <span className="text-[#a9a9a9]">인증 구역</span>
      </div>
    </div>
  </div>
  )
}