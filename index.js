
const config = require('./config').getConfig();
const appContainer = require('./appContainer')
appContainer.register('config', config);
// load implementations
const JwtAccessTokenManager = require('./lib/infrastructure/security/JwtAccessTokenManager');
const UserSerializer = require('./lib/interfaces/serializers/UserSerializer');
const UserRepositoryInMemory = require('./lib/infrastructure/repositories/UserRepositoryInMemory');
const BookingRepositoryInMemory = require('./lib/infrastructure/repositories/BookingRepositryInMemory');
const FillingStationRepositoryInMemory = require('./lib/infrastructure/repositories/FillingStationRepositoryInMemory');
// register implementations
appContainer.register('accessTokenManager', new JwtAccessTokenManager())
appContainer.register('userSerializer', new UserSerializer());
appContainer.register('userRepository', new UserRepositoryInMemory());
appContainer.register('bookingRepository', new BookingRepositoryInMemory());
appContainer.register('stationsRepository', new FillingStationRepositoryInMemory());


// const dbServer = require('./lib/infrastructure/database');
const webServer = require('./lib/infrastructure/webserver/server');
const stationFinderService = require('./lib/infrastructure/finders/stationFinderService');

const storageSystem = require('./lib/infrastructure/storage/index')

const {dbConfig, webServerConfig} = config;
storageSystem(webServerConfig.uploadDir);

(async function() {
  try {
    await stationFinderService.boot(appContainer);
    // await dbServer.boot(dbConfig);
    await webServer.boot({...webServerConfig, appContainer});
    console.info('System booted successfully!');
  } catch (error) {
    console.error(error)
    console.error("System boot failure!");
    process.exit(1)
  }
}());
