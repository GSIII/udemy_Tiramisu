import MoreIcon from '../icons/MoreIcon';
import MoreCircles from './MoreCircles';

type HandinType = {
  id: string;
  userName: string,
  text: string,
  handinImg: string,
  date: string;
};

const dateFormatter = (timestamp: string) => {
    const date = new Date(timestamp).toLocaleString().slice(0,-3);
    return date;
  }

const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  console.log('show detail');
}

const Handin = ({id, userName, handinImg, text, date}: HandinType) => {
  return (
    <div
      key={id}
      className="border-b-2 border-b-middle-gray p-[15px] bg-light-purple"
      onClick={handleClick}
    >
      <div className='flex flex-grow'>
        <div className='pr-[8px]'>
          <div className='w-20 h-20 border-light-gray border-2 rounded-full overflow-hidden'>
            <img src={handinImg} className='w-full h-full object-cover'/>
          </div>
        </div>
        <div className='pr-[8px]'>
          <div className='pb-[16px]'>
            <span className='pr-[30px]'>{userName}</span>
            <span>14일차 과제</span>
          </div>
          <div className='pb-[10px]'>
            <span>{text}</span>
          </div>
          <div className='overflow-hidden rounded-lg bg-black aspect-video'>
            <img src={handinImg} alt='과제 인증 사진' className='w-full h-full object-cover'/>
          </div>
        </div>
        <div>
          <MoreCircles />
        </div>
      </div>
    </div>
  );
};
export default Handin;
