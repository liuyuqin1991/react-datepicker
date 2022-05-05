// gatsby-node.js
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

exports.onCreateWebpackConfig = (args) => {
  args.actions.setWebpackConfig({
    resolve: {
      // ⚠ Note the '..' in the path because the docz gatsby project lives in the `.docz` directory
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss'],
      alias: {
        Src: path.resolve(__dirname, '../src'),
        Typing: path.resolve(__dirname, '../src/typing'),
        Scss: path.resolve(__dirname, '../src/scss'),
        Asset: path.resolve(__dirname, '../src/asset'),
        Hook: path.resolve(__dirname, '../src/hook'),
        Util: path.resolve(__dirname, '../src/util'),
        Component: path.resolve(__dirname, '../src/component'),
      },
    },
  });
};
