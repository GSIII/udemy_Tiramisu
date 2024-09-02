import BackArrowIcon from '../icons/BackArrowIcon';
import CalendarIcon from '../icons/CalendarIcon';

type HeaderType = {
  label?: string;
  rightIcon?: string;
}

function Header({ label, rightIcon }: HeaderType) {
  return (
    <div className='border-b border-[#E6E6E6] flex items-center justify-between px-[16px]'>
      <span className='hover:cursor-pointer' onClick={() => window.history.back()}>
        <BackArrowIcon />
      </span>
      <span className='text-lg font-bold'>{label}</span>
      <span className='hover:cursor-pointer'>
        <CalendarIcon />
      </span>
    </div>
  );
}
export default Header;
