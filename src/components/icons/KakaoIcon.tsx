import { SVGProps } from 'react';

function KakaoIcon({ width = 24, height = 24 }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 18 17"
    >
      <g
        transform="translate(0.000000,17.000000) scale(0.100000,-0.100000)"
        stroke="none"
      >
        <path
          fill="#212529"
          d="M38 154 c-15 -8 -30 -25 -34 -38 -6 -26 10 -66 27 -66 7 0 9 -10 5 -26 -7 -25 -6 -25 16 -10 12 9 31 16 41 16 29 0 75 28 82 50 10 31 -3 59 -35 75 -36 19 -67 18 -102 -1z"
        />
      </g>
    </svg>
  );
}
export default KakaoIcon;
