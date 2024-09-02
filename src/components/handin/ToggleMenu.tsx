import { useState } from 'react';
import CopyIcon from '../icons/CopyIcon';
import DeleteIcon from '../icons/DeleteIcon';
import EditIcon from '../icons/EditIcon';
import MoreIcon from '../icons/MoreIcon';

type ToggleMenuProps = {
    menus: {
        icon: string,
        label: string,
    }[];
  onClick: Function;
};

export default function ToggleMenu({ menus, onClick }: ToggleMenuProps) {
    const [isOpened, setIsOpened] = useState(false);

    const getIcon = (icon: string) => {
        switch(icon) {
            case 'share': return <CopyIcon className='mr-[10px]' />;
            case 'edit': return <EditIcon className='mr-[10px]'/>;
            case 'delete': return <DeleteIcon className='mr-[10px]' />;
        };
    }

    const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setIsOpened(!isOpened);
    }

  return (
    <>
    {isOpened ? (
        <div onClick={handleClick}>
            <MoreIcon className='h-7 w-7 fill-black stroke-black' />
            <div className="absolute mr-0 w-[114px] rounded-lg border border-[#eee] bg-white text-sm">
                <ul>
                    {menus.map(menu => {
                        return (
                            <li key={menu.icon} className='flex items-center border-b-[1px] border-[#eee]'>
                                <button
                                    className='flex w-full items-center px-4 py-[10px] text-[#555]'
                                    onClick={() => onClick(menu.icon)}
                                >
                                    {getIcon(menu.icon)}
                                    {menu.label}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    ) : (
        <>
      <button type='button' onClick={handleClick}>
        <MoreIcon className='h-7 w-7 fill-black stroke-black' />
      </button>
      </>
    )}
    </>
  );
}
