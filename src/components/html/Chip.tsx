import React from 'react';

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-lg py-1.5 text-center transition duration-300 ${
        selected
          ? 'border border-[#6224FD] bg-[#EFE9FF]'
          : 'border border-[#D9D9D9] bg-[#FFFFFF]'
      } inline-flex items-center justify-center px-3`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`mr-2 ${selected ? 'fill-[#6224FD]' : 'fill-[#D9D9D9]'}`}
      >
        <circle cx="10" cy="10" r="10" />
        <path
          d="M14.0167 6.8312C14.1144 6.93836 14.1693 7.08362 14.1693 7.23507C14.1693 7.38653 14.1144 7.53179 14.0167 7.63894L8.974 13.1636C8.87619 13.2706 8.7436 13.3307 8.60536 13.3307C8.46712 13.3307 8.33453 13.2706 8.23672 13.1636L5.9762 10.687C5.88394 10.5787 5.83368 10.4354 5.83602 10.2872C5.83835 10.1391 5.8931 9.99776 5.98872 9.893C6.08434 9.78824 6.21336 9.72826 6.34857 9.7257C6.48378 9.72314 6.61461 9.77821 6.71348 9.87928L8.60536 11.952L13.2794 6.8312C13.3772 6.72418 13.5098 6.66406 13.6481 6.66406C13.7863 6.66406 13.9189 6.72418 14.0167 6.8312Z"
          fill="white"
        />
      </svg>
      {label}
    </div>
  );
};

export default Chip;
