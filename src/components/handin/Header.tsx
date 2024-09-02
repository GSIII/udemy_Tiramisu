import LeftArrowIcon from '../icons/LeftArrowIcon'

type HeaderType = {
    label?: string,
    rightIcon?: string,
}

const Header = ({label, rightIcon}: HeaderType) => {
    const handleClick = () => {
        history.back();
    }

  return (
    <div className='flex justify-between py-[40px]'>
        <span onClick={handleClick} className='hover:cursor-pointer'>
            <LeftArrowIcon className='w-5 h-5'/>
        </span>
        <span>{label}</span>
        <span>{rightIcon ? rightIcon : ''}</span>
    </div>
  )
}
export default Header
