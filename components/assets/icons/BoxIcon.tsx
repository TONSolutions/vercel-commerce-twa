import clsx from "clsx";

export default function BoxIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 28 28"
      {...props}
      className={clsx("h-7 w-7", props.className)}
    >
      <path
        d="M23.7892 8.65859L13.9774 14.206M13.9774 14.206L4.16553 8.65859M13.9774 14.206V24.2621M19.1007 11.4323L9.28882 5.88491M4.42928 9.53515V18.3013C4.42928 18.9319 4.76855 19.5137 5.31737 19.8243L13.4028 24.4C13.7593 24.6018 14.1955 24.6018 14.552 24.4L22.6374 19.8243C23.1862 19.5137 23.5255 18.9319 23.5255 18.3013V9.53515C23.5255 8.90455 23.1862 8.32272 22.6374 8.01213L15.4139 3.92419C14.5226 3.4198 13.4321 3.4198 12.5409 3.92419L5.31737 8.01213C4.76855 8.32272 4.42928 8.90455 4.42928 9.53515Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
