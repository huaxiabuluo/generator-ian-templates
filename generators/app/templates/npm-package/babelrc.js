const { BABEL_MODULE } = process.env;
const cjs = BABEL_MODULE === 'commonjs';

export default {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: cjs ? BABEL_MODULE : false,
        useBuiltIns: 'usage',
        corejs: { version: '3.35', proposals: true },
        targets: 'chrome >= 90, safari >= 15, firefox >= 90',
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime'],
};
