'use client';

import Button from './Button';

type TModal = {
  title: string | undefined;
  subtitle: string | undefined;
  onConfirm: () => void;
  onCancel: () => void;
};

function SimpleModal({ title, subtitle, onConfirm, onCancel }: TModal) {
  return (
    <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
      <div className="p-4 text-center md:p-5">
        <h1>{title}</h1>
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          {subtitle}
        </h3>
        <div className="flex gap-4">
          <Button
            label="확인"
            type="primary"
            size="small"
            onClick={onConfirm}
          />
          <Button label="취소" size="small" onClick={onCancel} />
        </div>
      </div>
    </div>
  );
}
export default SimpleModal;
