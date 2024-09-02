'use client';

import { Dispatch } from 'react';

function TabMenu({
  menus,
  activeMenu,
  onClick,
}: {
  menus: {
    id: string;
    name: string;
  }[];
  activeMenu: string;
  onClick: Dispatch<string>;
}) {
  return (
    <ul className="flex border-t-2 border-middle-gray bg-white px-[14px]">
      {menus.map((menu: { id: string; name: string }) => {
        return (
          <li
            key={menu.id}
            className={`${activeMenu === menu.id ? 'border-b-2 border-b-main-purple text-main-purple' : ''} flex-grow text-center`}
            role="presentation"
            onClick={() => onClick(menu.id)}
          >
            <p className="m-[14px]">{menu.name}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default TabMenu;
