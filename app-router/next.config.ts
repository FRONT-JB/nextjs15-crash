import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // NextApp에서 발생하는 네트워크 요청이 콘솔에 발생한다.
  logging: {
    fetches: { fullUrl: true },
  },
};

export default nextConfig;
