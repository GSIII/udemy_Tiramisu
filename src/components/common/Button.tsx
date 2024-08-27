interface ButtonProps {
  label: string | React.ReactNode;
  primary: boolean;
  size?: 'small' | 'medium' | 'large';
  borderStyle: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  id?: string;
}

const Button = ({
  primary,
  label,
  size,
  borderStyle,
  onClick,
  type = 'button',
  id,
}: ButtonProps) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'w-[120px]';
      case 'medium':
        return 'w-[200px]';
      case 'large':
        return 'w-[350px]';
    }
  };

  const color = primary ? 'bg-main-purple border-main-purple text-white' : '';

  return (
    <button
      type={type}
      className={`rounded-lg border-2 border-middle-gray p-3 ${getSize()} ${color} ${borderStyle} text-gray-purple`}
      onClick={onClick}
      id={id}
    >
      {label}
    </button>
  );
};
export default Button;
