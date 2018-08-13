const fs = require('fs-extra');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'fixtures');
const TARGET_DIR = path.join(__dirname, '..', '__generatedFixtures__');

/**
 * This function walks through whole srcDir directory and create corresponding file at targetDir.
 * If a file is .js, it will execute it and output as json. Otherwise it will just copy to targetDir.
 *
 * @param {*} srcDir
 * @param {*} targetDir
 */
module.exports = function(srcDir = SRC_DIR, targetDir = TARGET_DIR) {
  const walk = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
      file = dir + '/' + file;
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(file));
      } else {
        /* Is a file */
        const extension = path.extname(file);
        if (extension === '.js') {
          const json = require(file);
          fs.outputJsonSync(
            file.replace(srcDir, targetDir).replace('.js', '.json'),
            json,
          );
        } else {
          fs.copySync(file, file.replace(srcDir, targetDir));
        }
      }
    });
  };

  walk(srcDir);
};
