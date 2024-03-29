import clsx from "clsx";

export default function PlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
      className={clsx("h-6 w-6", props.className)}
    >
      <path
        d="M11.8672 6.61719V17.9238M17.5205 12.2705H6.21387"
        stroke="#007AFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
