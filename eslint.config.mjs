import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    plugins: ['unused-imports'],
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'no-shadow': 'off',
      'no-use-before-define': ['error', { functions: false, classes: true }],
      'no-use-before-define': ['error', { functions: false, classes: true }],
    },
  }),
];

export default eslintConfig;
