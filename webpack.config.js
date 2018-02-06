var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'adastats.js',
    library: 'adastats',
    libraryTarget: 'umd'
  }
};
