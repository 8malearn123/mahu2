import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Unmatched URLs get the branded 404 in src/app/global-not-found.tsx. The root layout lives
    // under the [lang] segment, so there is no top-level layout to wrap a regular not-found page.
    globalNotFound: true,
  },
  async redirects() {
    // Arabic is the site's default language.
    return [{ source: "/", destination: "/ar", permanent: false }];
  },
};

export default nextConfig;
