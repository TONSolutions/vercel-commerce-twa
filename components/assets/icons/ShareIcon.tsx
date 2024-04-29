export default function ShareIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      {...props}
      className={props.className}
    >
      <rect
        width="40"
        height="40"
        rx="20"
        fill="#007AFF"
        fillOpacity="0.1"
        shapeRendering="crispEdges"
      />

      <g transform="translate(-20, -16)">
        <path
          width="40"
          height="40"
          x="0"
          y="0"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M41.0059 27.879C40.8219 27.879 40.669 28.0155 40.669 28.2354V32.7618H39.834C38.2374 32.7618 36.7141 32.9226 35.3362 33.5059C34.1872 33.9951 33.2565 34.6942 32.5272 35.6025C31.066 37.4386 30.3077 40.1341 30.3077 43.6455C30.3077 43.8159 30.356 43.9762 30.4152 44.067C30.4398 44.1047 30.4569 44.1162 30.4589 44.1175C30.4595 44.1177 30.4609 44.118 30.4632 44.1183C30.4661 44.1187 30.4711 44.1191 30.4786 44.1191C30.7009 44.1191 30.8301 44.0454 30.9441 43.8365C32.8305 40.2842 36.2112 39.2461 39.834 39.2461H40.669V43.8116C40.669 43.9398 40.7012 43.9944 40.742 44.0366C40.784 44.0756 40.8487 44.1083 40.9462 44.1168C41.051 44.1261 41.1714 44.1039 41.277 44.051L41.2908 44.0441L41.3049 44.0377C41.4115 43.9893 41.5607 43.8919 41.7509 43.7123L49.4603 36.4328C49.5855 36.3163 49.6289 36.2369 49.6428 36.2016C49.71 36.0305 49.708 35.9528 49.6428 35.7868C49.6289 35.7515 49.5855 35.672 49.4604 35.5555L41.7491 28.3427C41.3737 27.9861 41.1709 27.879 41.0059 27.879ZM38.999 28.2354C38.999 27.1338 39.8595 26.209 41.0059 26.209C41.8999 26.209 42.5392 26.7899 42.897 27.1297C42.8978 27.1305 42.8986 27.1312 42.8994 27.132L50.5983 34.3332C50.5981 34.3331 50.5985 34.3334 50.5983 34.3332C50.8505 34.5682 51.0679 34.8471 51.1971 35.1762C51.4127 35.7247 51.4224 36.2389 51.1971 36.8122C51.0682 37.1405 50.8521 37.4184 50.6006 37.653C50.5998 37.6537 50.5991 37.6544 50.5983 37.6551L42.8976 44.9264C42.8976 44.9265 42.8976 44.9264 42.8976 44.9264C42.623 45.1857 42.3276 45.4049 42.0098 45.5517C41.2994 45.9005 40.2822 45.9177 39.5747 45.2311L39.5658 45.2224C39.1791 44.8356 38.999 44.3424 38.999 43.8116V40.937C36.0757 41.088 33.766 42.0805 32.4174 44.6228L32.414 44.6292C32.0164 45.3631 31.3327 45.7891 30.4786 45.7891C29.796 45.7891 29.3035 45.4193 29.0165 44.9795C28.746 44.5649 28.6377 44.0709 28.6377 43.6455C28.6377 39.9249 29.4371 36.8025 31.2218 34.561L31.2238 34.5585C32.1349 33.4233 33.2935 32.5604 34.6828 31.969L34.6842 31.9684C36.0876 31.3742 37.5642 31.1607 38.999 31.1068V28.2354Z"
          fill="#007AFF"
        />
      </g>
    </svg>
  );
}
