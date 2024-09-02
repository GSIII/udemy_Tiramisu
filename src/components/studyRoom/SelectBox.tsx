import UpdownArrowIcon from '../icons/UpdownArrowIcon'
import Mark from '../common/Mark'
import { useModal } from '@/hooks/hooks';

const SelectBox = ({ list, selectedItem, setSelectedItem }) => {
  
  const handleCancel = () => {
    console.log('onCancel');
    closeModal();
  }
  
  const handleConfirm = (data) => {
    setSelectedItem(data);
    closeModal();
  }

  const { openModal, closeModal, Modal } = useModal({
    type: 'data',
    data: list,
    title: '수정',
    subtitle: '수정하시겠습니까?',
    onConfirm: handleConfirm,
    onCancel: handleCancel,
  });


  return (
    <>
    <div className='h-[70px] bg-white border-2 border-light-gray rounded-md drop-shadow-md' onClick={openModal}>
      <div className='flex'>
          <div className='flex flex-col justify-center items-center w-[18px] h-[40px] bg-[#F7F3FF] border border-[#EBE9F5] rounded-lg m-[16px]'>
            <UpdownArrowIcon className='w-5 h-5'/>
          </div>
          <div className='flex flex-col justify-center flex-grow'>
            <span className='text-base font-medium mb-[2px]'>{selectedItem.title}</span>
            <span className='text-xs text-gray-purple'>{selectedItem.subtitle}</span>
          </div>
          <div className='flex flex-col justify-end items-end mb-[18px] mr-[18px]'>
            <Mark />
          </div>
      </div>
    </div>
    <Modal />
    </>
  )
}
export default SelectBox