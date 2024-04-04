export default function CaretRightIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 7 12"
      {...props}
      className={props.className}
    >
      <g clipPath="url(#clip0_150_1190)">
        <path
          d="M1 1L6 6L1 11"
          stroke="#C8C7CB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <defs>
        <clipPath id="clip0_150_1190">
          <rect width="7" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
