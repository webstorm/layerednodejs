const UploadFile = require('../../application/use_cases/UploadFile');

module.exports = {
  async upload(request) {
    const {ioc} = request.server.app;
    const {uploadDir} = ioc.config.webServerConfig;
    const {file} = request.payload;
    const result = await UploadFile(file, uploadDir);
    return result;
  }
};
