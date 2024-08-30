type StudyButtonProps = {
  style?: 'primary' | 'secondary' | 'disabled';
  type?: 'button' | 'submit';
  label?: string;
  size?: string;
  borderStyle?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  buttonStyle?: string;
};

export default function StudyButton({
  style,
  type = 'button',
  label,
  size,
  borderStyle,
  onClick,
  children,
  disabled,
  id,
  buttonStyle,
  ...props
}: StudyButtonProps) {
  const getSize = () => {
    switch (size) {
      case 'small':
        return ' flex-[1]';
      case 'medium':
        return ' flex-[1.66]';
      case 'large':
        return 'w-full min-w-[340px] max-w-[600px]';
    }
  };

  const getColor = () => {
    switch (style) {
      case 'primary':
        return 'bg-main-purple border-main-purple text-white bg-sub-purple text-center transition-all hover:bg-main-purple ';
      case 'secondary':
        return 'border-main-purple text-main-purple';
      case 'disabled':
        return 'bg-disabled text-white';
      default:
        return 'border-middle-gray text-gray-purple';
    }
  };

  return (
    <>
      <button
        id={id}
        type={type}
        className={`h-[50px] rounded-lg border ${getSize()} ${getColor()} ${borderStyle} ${buttonStyle}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {label}
        {children}
      </button>
    </>
  );
}
