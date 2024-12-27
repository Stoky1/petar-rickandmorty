import type { NextConfig } from 'next';
import { i18n } from './next-i18next.config'; // Import the i18n config from next-i18next.config.js

const nextConfig: NextConfig = {
  images: {
    // We set image as `unoptimized` to not exceed the
    // fair usage policy of vercel about image optimization.
    // https://vercel.com/docs/platform/fair-use-policy
    // https://nextjs.org/docs/app/api-reference/components/image#unoptimized
    unoptimized: true,
  },
  eslint: {
    // To make `next lint` check files and folders besides the default folders (`src`, `app` etc.):
    // https://nextjs.org/docs/app/building-your-application/configuring/eslint#linting-custom-directories-and-files
    dirs: [
      'config',
      'src',
      'codegen.ts',
      'eslint.config.mjs',
      'graphql.config.ts',
      'knip.config.ts',
      'lint-staged.config.mjs',
      'next.config.ts',
      'postcss.config.js',
      'prettier.config.mjs',
      'tailwind.config.ts',
    ],
  },
  i18n, 
};

export default nextConfig;
