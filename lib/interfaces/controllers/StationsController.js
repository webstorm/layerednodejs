const ListStations = require('../../application/use_cases/ListStations');

module.exports = {
  list: (request) => {
    const {ioc} = request.server.app;
    return ListStations(ioc);
  },
  view: (request) => {
    const {ioc} = request.server.app;
    const {id} = request.params;
    return viewStation(id, ioc);
  }
}
