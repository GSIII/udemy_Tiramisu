import { useState, Dispatch } from 'react'
import Button from '@/components/common/Button';
import SelectModal from '@/components/studyRoom/SelectModal';
import SimpleModal from '@/components/common/SimpleModal';

type TModal = {
    type?: string;
    data?: [];
    title?: string;
    subtitle?: string;
    onConfirm: Dispatch<void>;
    onCancel: Dispatch<void>;
};

export const useModal = ({type='none', data, title, subtitle, onConfirm, onCancel}: TModal) => {
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const getModal = () => {
        switch(type) {
            case 'data': return <SelectModal data={data} onConfirm={onConfirm} onCancel={onCancel}/>
            default: return <SimpleModal title={title} subtitle={subtitle} onConfirm={onConfirm} onCancel={onCancel}/>
        }
    }

    const Modal = () => {
        return (
            <div id='popupModal' className={`${open ? '' : 'hidden'} fixed top-0 left-0 z-50 w-full h-full bg-dark-gray bg-opacity-50`}>
                <div className='relative m-auto p-4 w-full top-[50%]'>
                        {
                            getModal()
                        }
                </div>
            </div>
        );
    }

    return {
        Modal,
        openModal,
        closeModal,
    }
};

export const newModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const open = () => {setIsOpen(true)};
    const close = () => {setIsOpen(false)};

    const Modal = ({children}) => {
        return (
            <div id='popupModal' className={`${isOpen ? '' : 'hidden'} fixed top-0 left-0 z-50 w-full h-full bg-dark-gray bg-opacity-50`}>
                <div className='relative m-auto p-4 w-full top-[50%]'>
                        {children}
                </div>
            </div>
        )
    }
    return {
      Modal,
      open,
      close,
    };
  };
