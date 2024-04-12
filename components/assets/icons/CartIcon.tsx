import clsx from "clsx";

export default function CartIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
      className={clsx("h-6 w-6", props.className)}
    >
      <path
        d="M9.36624 5.73285C9.36624 4.0612 10.7214 2.70605 12.393 2.70605C14.0647 2.70605 15.4198 4.0612 15.4198 5.73285M7.90663 20.249H16.8809C17.9882 20.249 18.5419 20.249 18.9648 20.0335C19.3368 19.8439 19.6393 19.5415 19.8289 19.1694C20.0444 18.7465 20.0444 18.1928 20.0444 17.0855V9.29351C20.0444 8.1862 20.0444 7.63254 19.8289 7.2096C19.6393 6.83757 19.3368 6.53511 18.9648 6.34555C18.5419 6.13005 17.9882 6.13005 16.8809 6.13005H7.90663C6.79931 6.13005 6.24565 6.13005 5.82271 6.34555C5.45069 6.53511 5.14822 6.83757 4.95866 7.2096C4.74316 7.63254 4.74316 8.1862 4.74316 9.29351V17.0855C4.74316 18.1928 4.74316 18.7465 4.95866 19.1694C5.14822 19.5415 5.45069 19.8439 5.82271 20.0335C6.24565 20.249 6.79931 20.249 7.90663 20.249Z"
        stroke="black"
        strokeWidth="1.8"
      />
    </svg>
  );
}