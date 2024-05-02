import clsx from "clsx";

export default function IconPlus(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 28 28"
      {...props}
      className={clsx("h-7 w-7", props.className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 14C3 7.92487 7.92487 3 14 3C20.0751 3 25 7.92487 25 14C25 20.0751 20.0751 25 14 25C7.92487 25 3 20.0751 3 14ZM14 8.2C14.4418 8.2 14.8 8.55817 14.8 9V13.2H19C19.4418 13.2 19.8 13.5582 19.8 14C19.8 14.4418 19.4418 14.8 19 14.8H14.8V19C14.8 19.4418 14.4418 19.8 14 19.8C13.5582 19.8 13.2 19.4418 13.2 19V14.8H9C8.55817 14.8 8.2 14.4418 8.2 14C8.2 13.5582 8.55817 13.2 9 13.2H13.2V9C13.2 8.55817 13.5582 8.2 14 8.2Z"
        fill="#007AFF"
      />
    </svg>
  );
}
