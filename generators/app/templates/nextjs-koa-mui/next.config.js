const path = require('path');
const nextTM = require('next-transpile-modules');

/**
 * es modules which should be transpiled to commonjs
 * @example
 * ```js
 * const withTM = nextTM(['react-github-btn']);
 * ```
 */
const withTM = nextTM([]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  webpack5: true,
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'components'), path.join(__dirname, 'styles'), path.join(__dirname, 'src')],
  },
});
