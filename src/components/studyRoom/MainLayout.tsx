'use client';
import { useRouter, usePathname } from 'next/navigation';
import PlusIcon from '../icons/PlusIcon';
import SelectBox from './SelectBox';
import TabMenu from './TabMenu';

const MainLayout = ({ list, selectedItem, setSelectedItem }) => {
  const menus = [
    {id: 'schedule', name: '캘린더'},
    {id: 'handin', name: '과제'},
    {id: 'chat', name: '채팅'},];
    const pathName = usePathname().split('/');
    const activeMenu = pathName[pathName.length-1];
    const router = useRouter();

    const handleClick = (menu: string) => {
      router.push(`./${menu}`);
    }

  return (
    <div className="bg-[#E3E3FA]">
    <div className="mx-[16px] flex justify-between pb-[17px]">
      <span>스터디룸</span>
      <PlusIcon className="h-5 w-5 fill-black stroke-black" />
    </div>
    <div className="mr-[16px] flex justify-end">
      <div>
        <span className="bg-sub-purple p-2">진행중 3</span>
        <span className="bg-white p-2 text-middle-gray">진행완료</span>
      </div>
    </div>
    <div className="mx-[16px] pb-[20px] pt-[12px]">
      <SelectBox list={list} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
    </div>
    <TabMenu menus={menus} activeMenu={activeMenu} onClick={menu => handleClick(menu)}/>
  </div>
  )
}
export default MainLayout;