'use strict';

const Hapi = require('@hapi/hapi');
const Good = require('@hapi/good');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Blipp = require('blipp');
const HapiSwagger = require('hapi-swagger');
const Package = require('../../../package');

const createServer = async ({port, host, appContainer}) => {

  const server = Hapi.server({
    host,
    port
  });

  server.app.ioc = appContainer.getInstance();

  await server.register([
    Blipp,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'CodeBrew Test Documentation',
          version: Package.version,
        },
      }
    },
    {
      plugin: Good,
      options: {
        ops: {
          interval: 1000 * 60
        },
        reporters: {
          myConsoleReporter: [
            {
              module: '@hapi/good-squeeze',
              name: 'Squeeze',
              args: [{ ops: '*', log: '*', error: '*', response: '*' }]
            },
            {
              module: '@hapi/good-console'
            },
            'stdout'
          ]
        }
      },
    },
  ]);

  // Register custom plugins
  await server.register([
    require('./oauth'),
    require('../../interfaces/routes/upload'),
    require('../../interfaces/routes/bookings'),
    require('../../interfaces/routes/users'),
    require('../../interfaces/routes/stations'),
  ]);

  return server;
};


module.exports.boot = async function (config) {
  const server = await createServer(config);
  const result = await server.start();
  return result;
}
