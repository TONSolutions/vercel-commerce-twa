import clsx from "clsx";

export default function LogoutIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 28 28"
      {...props}
      className={clsx("h-7 w-7", props.className)}
    >
      <path
        d="M4.13135 13.8041H21.6954M21.6954 13.8041L14.8923 7.00098M21.6954 13.8041L14.8923 20.6072M23.4436 7.00098V20.6072"
        stroke="black"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
