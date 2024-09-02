'use client';

import { Dispatch, useState } from 'react';

import Button from '../common/Button';
import CheckSign from '../handin/CheckSign';

type TSelectModal = {
  data: [] | undefined;
  onConfirm: Dispatch<TSelectItem | undefined>;
  onCancel: Dispatch<void>;
};

type TSelectItem = {
  id: string;
  title?: string | undefined;
  subtitle?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
};

function SelectModal({ data, onConfirm, onCancel }: TSelectModal) {
  const [selectedItem, setSelectedItem] = useState<TSelectItem | undefined>();

  const dateFormatter = (timestamp: string | undefined) => {
    let date;
    if (timestamp) {
      date = new Date(timestamp).toLocaleDateString().slice(0, -1);
    }
    return date;
  };

  return (
    <div className="relative rounded-lg bg-[#f9f9f9] p-5">
      {data &&
        data.map((item: TSelectItem) => {
          return (
            <button
              type="button"
              key={item.id}
              className="m-[8px] flex rounded-md border-2 border-light-gray bg-white drop-shadow-md"
              onClick={() => setSelectedItem(item)}
            >
              <div className="flex flex-grow flex-col justify-center p-[16px]">
                <span className="mb-[2px] text-base font-medium">
                  {item.title}
                </span>
                <span className="text-xs text-gray-purple">
                  {item.subtitle}
                </span>
                <span className="text-xs text-gray-purple">{`${dateFormatter(item.startDate)} ~ ${dateFormatter(item.endDate)}`}</span>
              </div>
              {selectedItem && (
                <div
                  className={`${selectedItem.id === item.id ? '' : 'hidden'} m-auto mr-[20px]`}
                >
                  <CheckSign
                    fill="fill-main-purple"
                    background="bg-white"
                    border="bg-main-purple"
                    size="small"
                  />
                </div>
              )}
            </button>
          );
        })}
      <div className="flex">
        <Button
          type="primary"
          label="확인"
          onClick={() => onConfirm(selectedItem)}
        />
        <Button label="취소" onClick={() => onCancel()} />
      </div>
    </div>
  );
}
export default SelectModal;
