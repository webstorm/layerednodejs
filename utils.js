const buildStationFinderForType = (type) => (repository) => (criteria) => repository.find(Object.assign({}, {type}, criteria));

module.exports.dieselStationFinderHandlerForRepository = buildStationFinderForType('diesel');
module.exports.gasStationFinderHandlerForRepository = buildStationFinderForType('gas');
module.exports.petrolStationFinderHandlerForRepository = buildStationFinderForType('petrol');


