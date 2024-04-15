export default function TonIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 22"
      {...props}
      className={props.className}
    >
      <path
        d="M11 18.1506L17.3465 7.14998C17.9712 6.06718 18.2835 5.52579 18.2367 5.08155C18.1959 4.69407 17.9926 4.3421 17.6774 4.11311C17.316 3.85059 16.691 3.85059 15.4409 3.85059H11M11 18.1506L4.65349 7.14998C4.02881 6.06718 3.71646 5.52579 3.76325 5.08155C3.80407 4.69407 4.00736 4.3421 4.32259 4.11311C4.684 3.85059 5.30903 3.85059 6.5591 3.85059L11 3.85059M11 18.1506V3.85059"
        stroke="black"
        strokeWidth="1.83333"
        strokeLinejoin="round"
      />
    </svg>
  );
}
