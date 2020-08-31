const { dieselStationFinderHandlerForRepository, petrolStationFinderHandlerForRepository, gasStationFinderHandlerForRepository } = require('../../../utils');
const strategiesManager =  require('../../domain/StratgyManager');

class StationFinder {
  constructor(name, handler) {
    this.name = name;
    this.handler = handler;
  }
  find(criteria) {
    return this.handler(criteria)
  }
}


module.exports.boot = (appContainer) => {
  const stationsRepository = appContainer.resolve('stationsRepository');
  const dieselSationFinder = new StationFinder('diesel', dieselStationFinderHandlerForRepository(stationsRepository));
  const petrolStationFinder = new StationFinder('petrol', petrolStationFinderHandlerForRepository(stationsRepository));
  const gasStationFinder = new StationFinder('gas', gasStationFinderHandlerForRepository(stationsRepository));
  strategiesManager.register(dieselSationFinder);
  strategiesManager.register(petrolStationFinder);
  strategiesManager.register(gasStationFinder);

  appContainer.register('stationFinderService', strategiesManager);
}
