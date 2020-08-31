const joi = require('@hapi/joi');
const UploadController = require('../controllers/UploadController');

module.exports = {
  name: 'upload',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'POST',
        path: '/upload',
        handler: UploadController.upload,
        options: {
          description: 'Upload files',
          tags: ['api'],
          validate: {
            payload: joi.object().keys({
              file: joi.binary().required()
            })
          },
          payload: {
            multipart: true,
            maxBytes : 3 * 1024,
          }
        },
      }
    ]);
  }
};
