type Options = {
  path: string;
};

export const getShareLink = ({ path }: Options) => {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : `${process.env.NEXT_PUBLIC_WEBSITE_URL}`;

  const url = `${baseUrl}${path}`;

  return `https://t.me/share/url?url=${url}`;
};
