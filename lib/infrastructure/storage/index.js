const fs = require('fs');
module.exports = (upload_dir) => {
  if(!fs.existsSync(upload_dir)) {
    fs.mkdirSync(upload_dir);
  }

  if(!fs.existsSync(upload_dir)) throw new Error('Upload dir doesn\'t exists. Unable to create new!');
  return true;
};
