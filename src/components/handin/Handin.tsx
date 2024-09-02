'use client';
import { useRouter } from 'next/navigation';
import ProfileImg from '../common/ProfileImg';
import ToggleMenu from './ToggleMenu';

export type HandinType = {
  id: string;
  userName: string,
  text: string,
  handinImg: string,
  date: string;
  onEdit: Function;
  onDelete: Function;
};

const dateFormatter = (timestamp: string) => {
    const date = new Date(timestamp).toLocaleString().slice(0,-3);
    return date;
  }

const Handin = ({ id, userName, handinImg, text, date, onEdit, onDelete }: HandinType) => {
    const router = useRouter();
    const showHandinDetail = (handinId: string) => {
        router.push(`./handin/${handinId}`)
    }
    const handleTypeFunc = (type: string) => {
      if (type === 'edit') {
        onEdit();
      }
      if (type === 'delete') {
        onDelete();
      }
    }

  return (
    <div
      key={id}
      className="border-b-2 border-b-middle-gray p-[15px] bg-light-purple"
      onClick={() => showHandinDetail(id)}
    >
      <div className='grid grid-cols-[1fr_7fr_1fr] gap-2'>
        <div>
          <ProfileImg img={handinImg}/>
        </div>
        <div className=''>
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
          <div>
            <span>{dateFormatter(date)}</span>
          </div>
        </div>
        <div>
            <ToggleMenu
              menus={[{icon: 'edit', label: '수정하기'}, {icon: 'delete', label: '삭제하기'}]}
              onClick={(item: string) => {handleTypeFunc(item);}}
            />
        </div>
      </div>
    </div>
  );
};
export default Handin;
