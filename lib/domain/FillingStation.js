module.exports = class {

  // FillingStation Types
  static GAS = 'gas';
  static PETROL = 'petrol';
  static DIESEL = 'diesel';

  constructor(id = null, type) {
    this.id = id;
    this.type = type;
  }

};
