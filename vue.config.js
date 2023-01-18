/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

module.exports = {
  productionSourceMap: false,
  pwa: {
    name: 'demo',
    themeColor: '#323232',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#323232',
    msTileColor: '#323232',
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      // eslint-disable-next-line no-param-reassign
      args[0].title = 'demo';
      return args;
    });
  },
  configureWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              // eslint-disable-next-line @typescript-eslint/camelcase
              drop_console: true,
            },
            mangle: {
              toplevel: true,
            },
          },
        }),
      );
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: [
            '/',
            '/cmt',
            '/video-editor',
            '/privacy-policy',
          ],
        }),
      );
    }
  },
  devServer: {
    proxy: {
      '^/api/': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/',
        },
      },
    },
  },
};
