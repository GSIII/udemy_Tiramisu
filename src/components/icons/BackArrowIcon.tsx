import iconStyle from './iconStyle';

const BackArrowIcon = (props: iconStyle) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <path
        {...props}
        d="M23.5303 11.9697c.2929.2929.2929.7677 0 1.0606L16.5607 20l6.9696 6.9697c.2929.2929.2929.7677 0 1.0606-.2929.2929-.7677.2929-1.0606 0l-7.5-7.5c-.2929-.2929-.2929-.7677 0-1.0606l7.5-7.5c.2929-.2929.7677-.2929 1.0606 0Z"
      />
    </svg>
  );
};

export default BackArrowIcon;
