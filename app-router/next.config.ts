import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "shopping-phinf.pstatic.net" }, // 네이버 쇼핑 이미지 도메인 추가
    ],
  },

  // NextApp에서 발생하는 네트워크 요청이 콘솔에 발생한다.
  logging: {
    fetches: { fullUrl: true },
  },
};

export default nextConfig;
