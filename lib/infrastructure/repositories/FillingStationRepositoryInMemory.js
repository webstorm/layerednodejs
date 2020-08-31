const FillingStation = require('../../domain/FillingStation');
const FillingStationRepository = require('../../domain/FillingStationRepository');

module.exports = class extends FillingStationRepository {

  _initializeRepositoryWithTwoStations() {
    const gasStation1 = new FillingStation(null, FillingStation.GAS);
    const dieselStation1 = new FillingStation(null, FillingStation.DIESEL);
    const petrolStation1 = new FillingStation(null, FillingStation.PETROL);
    const gasStation2 = new FillingStation(null, FillingStation.GAS);
    const petrolStation2 = new FillingStation(null, FillingStation.PETROL);
    const petrolStation3 = new FillingStation(null, FillingStation.PETROL);
    const dieselStation2 = new FillingStation(null, FillingStation.DIESEL);

    const persist = this.persist.bind(this);

    Promise.all([gasStation1,dieselStation1,petrolStation1,gasStation2, petrolStation2,petrolStation3,dieselStation2].map(persist))
    .then(result => console.info(result))
    .catch(error => console.error('error persisting stations into repository', error));

    // this.persist(gasStation1)
    // .then(() => this.persist(dieselStation))
    // .then(() => this.persist(petrolStation))
  }

  _dataAsArray() {
    return Object.keys(this.data).map(key => this.data[key]);
  }

  constructor() {
    super();
    this.index = 1;
    this.data = {};
    this._initializeRepositoryWithTwoStations();
  }

  persist(fillingStationEntity) {
    const row = Object.assign({}, fillingStationEntity);
    const rowId = this.index++;
    row.id = rowId;
    this.data[rowId] = row;
    return Promise.resolve(row);
  }

  merge(fillingStationEntity) {
    let row = this.data[fillingStationEntity.id];
    Object.assign(row, fillingStationEntity);
    return Promise.resolve(row);
  }

  remove(fillingStationId) {
    delete this.data[fillingStationId];
    return Promise.resolve();
  }

  get(fillingStationId) {
    return Promise.resolve(this.data[fillingStationId]);
  }

  find(criteria={}) {
    const criteriaKeys = Object.keys(criteria);
    const allRecords = this._dataAsArray()
    const result = Object.keys(criteria).length > 0 ?  allRecords.filter(item => criteriaKeys.map(key => (key in item && item[key] === criteria[key])).reduce((prev, cur) => prev && cur, true)) : allRecords;
    return Promise.resolve(result);
  }

};
