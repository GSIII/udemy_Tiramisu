'use client';

interface ButtonProps {
  label: string;
  buttonType?: 'button' | 'submit';
  type?: 'primary' | 'secondary' | 'disabled';
  size?: 'small' | 'medium' | 'large';
  borderStyle?: string;
  onClick?: () => void;
}

function Button({
  type,
  buttonType = 'button',
  label,
  size,
  borderStyle = 'none',
  onClick,
}: ButtonProps) {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'min-w-[124px] w-full';
      case 'medium':
        return 'min-w-[254px] w-full';
      case 'large':
        return 'min-w-[340px] w-full';
      default:
        return 'min-w-[250px] w-full';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'primary':
        return 'bg-primary hover:bg-secondary hover:border-secondary transition-all border-primary text-white';
      case 'secondary':
        return 'border-primary text-primary';
      case 'disabled':
        return 'bg-disabled border-disabled text-white';
      default:
        return `${borderStyle || 'border-foreground'} text-muted-foreground`;
    }
  };

  return (
    <button
      type={buttonType}
      className={`rounded-lg border-2 p-3 ${getSize()} ${getColor()} ${borderStyle}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
export default Button;
