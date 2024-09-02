import iconStyle from './iconStyle';

const PlusIcon = (props: iconStyle) => {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.586 6.56205C15.9657 6.56205 16.2735 6.86986 16.2735 7.24955V24.7504C16.2735 25.1301 15.9657 25.4379 15.586 25.4379C15.2063 25.4379 14.8985 25.1301 14.8985 24.7504V7.24955C14.8985 6.86986 15.2063 6.56205 15.586 6.56205Z"
        fillOpacity="0.8"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.14805 16C6.14805 15.6203 6.45586 15.3125 6.83555 15.3125L24.3364 15.3125C24.7161 15.3125 25.0239 15.6203 25.0239 16C25.0239 16.3797 24.7161 16.6875 24.3364 16.6875L6.83555 16.6875C6.45586 16.6875 6.14805 16.3797 6.14805 16Z"
        fillOpacity="0.8"
      />
    </svg>
  );
}
export default PlusIcon