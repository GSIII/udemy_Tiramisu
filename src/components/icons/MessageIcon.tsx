import { SVGProps } from 'react';

export default function MessageIcon({
  width,
  height,
  ...rest
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      {...rest}
      viewBox="0 0 68 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M68 0H6.01739C3.81357 0 2 1.75127 2 3.92913L2 23.5405C2 25.6959 3.79061 27.4697 6.01739 27.4697H8.74921C8.84104 28.2555 8.7033 29.1985 7.89983 30.119C7.57843 30.4782 7.83095 31.062 8.336 30.9946C9.80521 30.7926 12.055 30.0292 13.7078 27.4697H48.9773C51.1811 27.4697 52.9947 25.7184 52.9947 23.5405V3.92913C52.9947 1.77372 51.2041 0 48.9773 0H68Z"
        fill="url(#paint0_linear_0_1)"
      />
      <g filter="url(#filter0_b_0_1)">
        <path
          d="M0 9H57.287C59.3238 9 61 10.7921 61 13.0206V30.3668C61 32.5724 59.345 34.3874 57.287 34.3874H54.7621C54.6772 35.1916 54.8045 36.1565 55.5471 37.0985C55.8442 37.4661 55.6108 38.0634 55.144 37.9945C53.7861 37.7877 51.7068 37.0066 50.1791 34.3874H17.5816C15.5447 34.3874 13.8685 32.5954 13.8685 30.3668V13.0206C13.8685 10.815 15.5235 9 17.5816 9H0Z"
          fill="url(#paint1_linear_0_1)"
          fillOpacity="0.5"
        />
        <path
          d="M54.3643 34.3455L54.4021 33.9874H54.7621H57.287C59.0933 33.9874 60.6 32.3836 60.6 30.3668V13.0206C60.6 10.9839 59.075 9.4 57.287 9.4H17.5816C15.7752 9.4 14.2685 11.0038 14.2685 13.0206V30.3668C14.2685 32.4035 15.7936 33.9874 17.5816 33.9874H50.1791H50.4089L50.5247 34.1859C51.9795 36.6803 53.9402 37.4063 55.2029 37.5989C55.2265 37.6023 55.2321 37.5971 55.2329 37.5966C55.2378 37.5935 55.2518 37.582 55.264 37.5534C55.2907 37.4907 55.2836 37.4087 55.236 37.3499L55.236 37.3499L55.233 37.3461C54.4129 36.3059 54.2709 35.2306 54.3643 34.3455Z"
          stroke="url(#paint2_linear_0_1)"
          strokeWidth="0.8"
        />
      </g>
      <g>
        <ellipse
          cx="2.37558"
          cy="2.37558"
          rx="2.37558"
          ry="2.37558"
          transform="matrix(-1 0 0 1 49.9219 18.9141)"
          fill="white"
        />
        <ellipse
          cx="2.37558"
          cy="2.37558"
          rx="2.37558"
          ry="2.37558"
          transform="matrix(-1 0 0 1 40.418 18.9141)"
          fill="white"
        />
        <ellipse
          cx="2.37558"
          cy="2.37558"
          rx="2.37558"
          ry="2.37558"
          transform="matrix(-1 0 0 1 30.918 18.9141)"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_b_0_1"
          x="-4"
          y="5"
          width="69"
          height="37"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_0_1"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_0_1"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_0_1"
          x1="54.4024"
          y1="6.64992"
          x2="22.6924"
          y2="42.8396"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7273FF" />
          <stop offset="1" stopColor="#B8B9FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_0_1"
          x1="15.7538"
          y1="11.7219"
          x2="60.3051"
          y2="31.1009"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="#D7D7FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_0_1"
          x1="54.0874"
          y1="9"
          x2="39.4805"
          y2="27.6282"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
