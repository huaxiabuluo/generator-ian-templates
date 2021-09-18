const Webpack = require('webpack');
// const internalIP = require('internal-ip');
const WebpackDevServer = require('webpack-dev-server');
const openBrowser = require('react-dev-utils/openBrowser');
const config = require('./tools/webpack.config.base');

const { devServer } = config;
const portal = devServer.https ? 'https' : 'http';
const port = devServer.port || 8080;
const ip = devServer.host || '127.0.0.1';

// for (let key in config.entry) {
//   const arr = config.entry[key];
//   if (key !== 'common') {
//     arr.unshift('webpack-dev-server/client?' + portal + '://' + ip + ':' + port + '/', 'webpack/hot/dev-server');
//   }
// }

// config.plugins = config.plugins || [];
// config.plugins.push(new webpack.HotModuleReplacementPlugin());
// config.plugins.push(new webpack.NamedModulesPlugin());

new WebpackDevServer(config.devServer, Webpack(config)).startCallback((err) => {
  if (err) {
    console.error(err);
    return;
  }
  openBrowser(portal + '://' + (ip || '127.0.0.1') + ':' + port);
  console.log('Opening your system browser...');
});
