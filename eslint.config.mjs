import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'prettier',
      'plugin:tailwindcss/recommended',
      'next',
    ],
    plugins: ['prettier', 'tailwindcss'],
    rules: {
      'prettier/prettier': 'error',
    },
    overrides: [{ files: ['*.js', '*.jsx', '*.ts', '*.tsx'] }],
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: '.',
    },
  }),
  {
    ignores: [
      'node_modules',
      '.next',
      '.husky',
      'coverage',
      '.prettierignore',
      '.stylelintignore',
      '.eslintignore',
      'stories',
      'storybook-static',
      '*.log',
      'playwright-report',
      '.nyc_output',
      'test-results',
      'junit.xml',
      'docs',
      'eslint.config.mjs',
      '*.db',
      'components/ui',
    ],
  },
];

export default eslintConfig;
