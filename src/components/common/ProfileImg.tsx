const ProfileImg = ({img}: any) => {

  return (
    <div className='border-middle-gray border-2 rounded-full overflow-hidden aspect-square'>
        <img src={img} className='w-full h-full object-cover'/>
    </div>
  )
}
export default ProfileImg