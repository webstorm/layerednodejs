const StationsController = require('../controllers/StationsController');
module.exports = {
  name: 'stations',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/stations',
        config: {
          auth: 'oauth-jwt',
          handler: StationsController.list,
          description: 'View filling stations list',
          tags: ['api'],
        },
      },
      {
        method: 'GET',
        path: '/stations/{stationId}',
        config: {
          auth: 'oauth-jwt',
          handler: StationsController.view,
          description: 'View a filling station',
          tags: ['api'],
        },
      }
    ]);
  }
};
