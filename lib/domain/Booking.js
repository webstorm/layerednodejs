const { GAS } = require("./FillingStation");

module.exports = class {

  // Booking Statuses
  static NEW = 'new';
  static PROGRESS = 'progress';
  static DONE = 'done';

  static DIESEL = 'diesel';
  static GAS = 'gas';
  static PETROL = 'petrol';

  constructor(id = null, type, qty, status, customerId, fillingStationId, fillerStaffId, bookedOn, fulfilledOn) {
    this.id = id;
    this.type = type;
    this.qty = qty;
    this.status = status;
    this.customerId = customerId;
    this.fillingStationId = fillingStationId;
    this.fillerStaffId = fillerStaffId;
    this.bookedOn = bookedOn;
    this.fulfilledOn = fulfilledOn;
  }



};
