import BackArrowIcon from '../icons/BackArrowIcon';
import CalendarIcon from '../icons/CalendarIcon';

type HeaderType = {
  label?: string;
  rightIcon?: React.ReactElement;
}

function Header({ label, rightIcon }: HeaderType) {
  return (
    <div className='py-2 border-b'>
    <div className='border-[#E6E6E6] flex items-center justify-between px-2'>
      <span className='hover:cursor-pointer w-[40px] h-[40px]' onClick={() => window.history.back()}>
        <BackArrowIcon />
      </span>
      <span className='text-lg font-bold'>{label}</span>
      <span className='w-[40px] h-[40px]'>
          <CalendarIcon />
      </span>
    </div>
    </div>
  );
}
export default Header;
