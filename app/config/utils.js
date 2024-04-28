const path = require('path');

function resolvePath(...dir) {
  return path.resolve(__dirname, '..', ...dir);
}

module.exports = {
  resolvePath,
};
