import withPWA from 'next-pwa';

const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
};

export default withPWA({
  dest: 'public',
  disable: isDev,
  runtimeCaching: [
    {
      urlPattern: /\/api\/v1\/seasons\/2026\/races/,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'races-cache' },
    },
    {
      urlPattern: /\/api\/v1\/drivers/,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'drivers-cache' },
    },
  ],
})(nextConfig);
