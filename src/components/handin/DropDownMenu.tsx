import { useState } from 'react';

import NewMoreIcon from '../icons/NewMoreIcon';
import MenuItem from './MenuItem';

type DropDownMenuProps = {
  menus: string[];
}

export default function DropDownMenu({ menus }: DropDownMenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className='flex justify-end'>
      <button
        type="button"
        className="flex h-[32px] w-[32px] items-center justify-center relative"
        onClick={() => setShowMenu(!showMenu)}
        onBlur={() => setShowMenu(false)}
        aria-label="moreActions"
      >
        <span id="svgContainer">
          <NewMoreIcon />
        </span>
      </button>
      {showMenu &&
        <div className="absolute top-10 translate-x-[1.4rem] shadow-xl">
          <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#eee]" />
          <div className="z-10 flex flex-col bg-[#eee] py-2 text-start">
            {menus.map(menu => {
              return <MenuItem key={menu} label={menu}/>;
            })}
          </div>
        </div>
      }
      </div>
  );
}
