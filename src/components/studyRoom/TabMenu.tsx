'use client';
const TabMenu = ({menus, activeMenu, onClick}: {menus: [], activeMenu: string, onClick: () => void}) => {
    return (
        <ul className='flex border-t-2 border-middle-gray bg-white px-[14px]'>
            {menus.map(menu => {
            return (
                <li key={menu.id} className={`${activeMenu === menu.id ? 'border-b-main-purple border-b-2 text-main-purple' : ''} flex-grow text-center`} onClick={() => onClick(menu.id)}>
                    <p className='m-[14px]'>{menu.name}</p>
                </li>
            )
            })}
        </ul>
    )
}

export default TabMenu;