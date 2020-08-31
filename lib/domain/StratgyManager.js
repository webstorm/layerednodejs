class StrategiesManger {

  constructor() {
    this.strategies = [];
  }

  register(strategy) {
    this.strategies.push(strategy);
  }

  by(name) {
    const strategy = this.strategies.find( strategy => strategy.name === name);
    if(!strategy)  throw new Error(`Finder Stratgy ${name} not registered`);
    return strategy;
  }

  find(criteria) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED');
  }

};


const manager = new StrategiesManger();
module.exports = manager;
