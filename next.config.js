/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'tailwindui.com',
      's.gravatar.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
    ],
  },
  eslint: {
    dirs: ['pages', 'components', 'api'],
  },
};
