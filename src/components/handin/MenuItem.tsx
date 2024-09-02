export default function MenuItem({label}: {label: string}) {
  return <span className='flex px-4 text-xs tracking-widest hover:bg-[#dfdfdf]'>{label}</span>
}