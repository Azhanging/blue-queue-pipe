const package = require('./package');

//输出源
const output = {
  library: "BlueQueuePipe",
  libraryTarget: 'umd',
  libraryExport: 'default'
};

const name = `blue-queue-pipe`;

module.exports = {
  library: {
    name,
    github: `https://github.com/azhanging/${name}`,
    date: `2016-${new Date().getFullYear()}`,
    version: package.version,
    author: package.author
  },
  webpackConfig: {
    dev: {
      output
    },
    prod: {
      output
    }
  }
};