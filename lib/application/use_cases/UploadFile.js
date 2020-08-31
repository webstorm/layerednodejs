const uuid = require('uuid').v1;
const path = require('path');
const promisify = require('util').promisify;
const fs = require('fs');
const writeFile = promisify(fs.writeFile);
const uploader = async function (file, uploadDir) {
  if (!file) throw new Error('no file(s)');

  return _fileHandler(file, uploadDir);
}

const _fileHandler = async function (file, uploadDir) {
  if (!file) throw new Error('no file');

  const filename = uuid();
  const destinationPath = path.join(uploadDir, filename);
  const fileStream = await writeFile(destinationPath, file);


  const fileDetails = {
    filename,
    destination: destinationPath,
    size: fs.statSync(destinationPath).size,
  }
  return fileDetails;
}


module.exports = uploader
