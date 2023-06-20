const { BABEL_ENV } = process.env;
const cjs = BABEL_ENV === 'commonjs';
const runtimeVersion = require(`./package.json`).dependencies['@babel/runtime'] || '^7.10.4';
const loose = true;

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'entry',
        corejs: {
          version: 3,
          proposals: true,
        },
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-typescript', { isTSX: true, allExtensions: true }],
  ],
  plugins: [
    ['@babel/proposal-object-rest-spread', { loose }],
    cjs && ['@babel/transform-modules-commonjs', { loose }],
    ['@babel/plugin-transform-runtime', { useESModules: !cjs, version: runtimeVersion }],
  ].filter(Boolean),
};
