import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "jakslab.work",
          },
        ],
        destination: "https://www.jakslab.work/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
