const Boom = require('@hapi/boom');
const GetAccessToken = require('../../application/use_cases/GetAccessToken');
const VerifyAccessToken = require('../../application/use_cases/VerifyAccessToken');

module.exports = {

  async getAccessToken(request) {

    const ioc = request.server.app.ioc;

    const grantType = request.payload['grant_type'];
    const email = request.payload['username'];
    const password = request.payload['password'];

    if (!grantType || grantType !== 'password') {
      return Boom.badRequest('Invalid authentication strategy');
    }

    try {
      const accessToken = await GetAccessToken(email, password, ioc);
      return accessToken;
    } catch (err) {
      return Boom.unauthorized('Bad credentials');
    }
  },

  verifyAccessToken(request, h) {

    const ioc = request.server.app.ioc;
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw Boom.badRequest('Missing or wrong Authorization request header', 'oauth');
    }
    const accessToken = authorizationHeader.replace(/Bearer/gi, '').replace(/ /g, '');

    try {
      const { uid } = VerifyAccessToken(accessToken, ioc);
      return h.authenticated({
        credentials: { uid },
        artifacts: { accessToken: accessToken }
      });
    } catch (err) {
      return Boom.unauthorized('Bad credentials');
    }
  },

};
