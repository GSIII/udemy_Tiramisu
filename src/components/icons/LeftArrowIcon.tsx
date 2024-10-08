import { Icon } from '../../types/icon';
const LeftArrowIcon = (props: Icon) => {
  return (
    <svg
      viewBox="0 0 10 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.53033 0.96967C9.82322 1.26256 9.82322 1.73744 9.53033 2.03033L2.56066 9L9.53033 15.9697C9.82322 16.2626 9.82322 16.7374 9.53033 17.0303C9.23744 17.3232 8.76256 17.3232 8.46967 17.0303L0.96967 9.53033C0.676777 9.23744 0.676777 8.76256 0.96967 8.46967L8.46967 0.96967C8.76256 0.676777 9.23744 0.676777 9.53033 0.96967Z"
      />
    </svg>
  );
}
export default LeftArrowIcon