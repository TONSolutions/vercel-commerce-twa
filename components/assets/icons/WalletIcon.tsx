import clsx from "clsx";

export default function WalletIcon(props: React.ComponentProps<"svg">) {
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
        d="M19.5676 5.83301H8.4324C6.64955 5.83301 5.98828 5.98153 5.33254 6.33222C4.75773 6.63963 4.30662 7.09074 3.99921 7.66555C3.64852 8.32129 3.5 8.98255 3.5 10.7654V17.2339C3.5 19.0168 3.64852 19.6781 3.99921 20.3338C4.30662 20.9086 4.75773 21.3597 5.33254 21.6671C5.98828 22.0178 6.64955 22.1663 8.4324 22.1663H19.5676C21.3505 22.1663 22.0117 22.0178 22.6675 21.6671C23.2423 21.3597 23.6934 20.9086 24.0008 20.3338C24.3515 19.6781 24.5 19.0168 24.5 17.2339V10.7654C24.5 8.98255 24.3515 8.32129 24.0008 7.66555C23.6934 7.09074 23.2423 6.63963 22.6675 6.33222C22.0117 5.98153 21.3505 5.83301 19.5676 5.83301Z"
        stroke="black"
        strokeWidth="1.8"
      />

      <path
        d="M21.5018 14H24.5002V17.5H21.5018C21.0594 17.5 20.635 17.3156 20.3221 16.9874C20.0093 16.6592 19.8335 16.2141 19.8335 15.75V15.75C19.8335 15.2859 20.0093 14.8408 20.3221 14.5126C20.635 14.1844 21.0594 14 21.5018 14V14Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M7 9.33301H10.2783"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
