import { Icon } from '@/types/icon';

export default function EyeIcon({
  props,
  fill,
}: {
  props?: Icon;
  fill?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox={'0 0 14 14'}
      fill="none"
      {...props}
    >
      <path
        fill={'#908794'}
        fillRule="evenodd"
        d="M1.98752 4.72189C3.03044 3.67897 4.667 2.625 7 2.625s3.9696 1.05397 5.0125 2.09689c.5202.5202.8953 1.03964 1.1409 1.42977.1231.19541.2142.35936.2754.47615.0306.05842.0538.10513.0697.13818.0079.01652.0141.02964.0185.03911l.0052.01143.0016.00361.0006.00127.0002.0005c.0001.00021.0002.0004-.3996.17809.3998.17769.3997.17788.3996.17809l-.0002.0005-.0006.00127-.0016.00361-.0052.01143c-.0044.00947-.0106.02259-.0185.03911-.0159.03305-.0391.07976-.0697.13818-.0612.11679-.1523.28074-.2754.47615-.2456.39013-.6207.90957-1.1409 1.42977C10.9696 10.321 9.333 11.375 7 11.375s-3.96956-1.054-5.01248-2.09689c-.5202-.5202-.89531-1.03964-1.14095-1.42977-.123033-.19541-.214209-.35936-.275381-.47615-.030602-.05842-.053745-.10513-.069656-.13818-.007957-.01652-.014109-.02964-.018487-.03911l-.005239-.01143-.001628-.00361-.000568-.00127-.000222-.0005C.475295 7.17788.475207 7.17769.875 7c-.399793-.17769-.399705-.17788-.399611-.17809l.000222-.0005.000568-.00127.001628-.00361.005239-.01143c.004378-.00947.01053-.02259.018487-.03911.015911-.03305.039054-.07976.069656-.13818.061172-.11679.152348-.28074.275381-.47615.24564-.39013.62075-.90957 1.14095-1.42977ZM.875 7l-.399793-.17769c-.050276.11313-.050276.24225 0 .35538L.875 7Zm.48918 0c.05146.09641.12538.22733.22284.38213.21921.34815.55504.81308 1.01921 1.27726C3.53206 9.58522 4.958 10.5 7 10.5s3.4679-.91478 4.3938-1.84061c.4641-.46418.8-.92911 1.0192-1.27726.0974-.1548.1714-.28572.2228-.38213-.0514-.09641-.1254-.22733-.2228-.38213-.2192-.34815-.5551-.81308-1.0192-1.27726C10.4679 4.41478 9.042 3.5 7 3.5s-3.46794.91478-4.39377 1.84061c-.46417.46418-.8.92911-1.01921 1.27726-.09746.1548-.17138.28572-.22284.38213ZM13.125 7l.3998.17769c.0503-.11313.0503-.24225 0-.35538L13.125 7Z"
        clipRule="evenodd"
      />
      <path
        fill={'#908794'}
        fillRule="evenodd"
        d="M7 5.25c-.9665 0-1.75.7835-1.75 1.75S6.0335 8.75 7 8.75 8.75 7.9665 8.75 7 7.9665 5.25 7 5.25ZM4.375 7c0-1.44975 1.17525-2.625 2.625-2.625S9.625 5.55025 9.625 7 8.44975 9.625 7 9.625 4.375 8.44975 4.375 7Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
