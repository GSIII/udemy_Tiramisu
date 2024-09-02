import { Dispatch, useState } from 'react';

import SimpleModal from '@/components/common/SimpleModal';
import SelectModal from '@/components/studyRoom/SelectModal';

type TModal = {
  type?: string;
  data?: [] | undefined;
  title?: string | undefined;
  subtitle?: string | undefined;
  onConfirm: () => unknown;
  onCancel: Dispatch<void>;
};

export const useModal = ({
  type = 'none',
  data,
  title,
  subtitle,
  onConfirm,
  onCancel,
}: TModal) => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const getModal = () => {
    switch (type) {
      case 'data':
        return (
          <SelectModal data={data} onConfirm={onConfirm} onCancel={onCancel} />
        );
      default:
        return (
          <SimpleModal
            title={title}
            subtitle={subtitle}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        );
    }
  };

  function Modal() {
    return (
      <div
        id="popupModal"
        className={`${open ? '' : 'hidden'} fixed left-0 top-0 z-50 h-full w-full bg-dark-gray bg-opacity-50`}
      >
        <div className="relative top-[50%] m-auto w-full p-4">{getModal()}</div>
      </div>
    );
  }

  return {
    Modal,
    openModal,
    closeModal,
  };
};

export const NewModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  function Modal({ children }) {
    return (
      <div
        id="popupModal"
        className={`${isOpen ? '' : 'hidden'} fixed left-0 top-0 z-50 h-full w-full bg-dark-gray bg-opacity-50`}
      >
        <div className="relative top-[50%] m-auto w-full p-4">{children}</div>
      </div>
    );
  }
  return {
    Modal,
    open,
    close,
  };
};
