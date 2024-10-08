import { Icon } from '@/types/icon';
const UnCheckedIcon = (props: Icon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      fill="none"
      {...props}
    >
      <circle cx="13.5" cy="13.5" r="13.5" fill="#D9D9D9" />
      <path
        fill="#fff"
        d="M20.1103 9.2402c.1566.154.2445.36275.2445.5804 0 .2177-.0879.4264-.2445.5804l-8.0813 7.9394c-.1567.1539-.3692.2402-.5908.2402-.2215 0-.434-.0863-.5907-.2402l-3.62272-3.559c-.14785-.1557-.2284-.3617-.22466-.5745.00375-.2129.09149-.4161.24472-.5666.15325-.1506.36001-.2368.57669-.2404.21668-.0037.42635.0754.5848.2207l3.03187 2.9786 7.4906-7.359c.1567-.15381.3692-.2402.5908-.2402.2215 0 .434.08639.5907.2402Z"
      />
    </svg>
  );
};
export default UnCheckedIcon;
