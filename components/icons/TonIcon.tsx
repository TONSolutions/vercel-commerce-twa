import clsx from "clsx";

export default function TonIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 34 34"
      {...props}
      className={clsx("h-8 w-8", props.className)}
    >
      <path
        d="M17 28.0502L26.8082 11.0493C27.7737 9.37585 28.2564 8.53914 28.1841 7.8526C28.121 7.25376 27.8068 6.7098 27.3196 6.35591C26.7611 5.9502 25.7951 5.9502 23.8632 5.9502H17M17 28.0502L7.19176 11.0493C6.22634 9.37584 5.74362 8.53914 5.81594 7.8526C5.87901 7.25376 6.19319 6.7098 6.68037 6.35591C7.2389 5.9502 8.20487 5.9502 10.1368 5.9502L17 5.9502M17 28.0502V5.9502"
        stroke="black"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
