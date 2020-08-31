const Booking = require('../../domain/Booking');
const BookingRepository = require('../../domain/BookingRepository');
const { book } = require('../../interfaces/controllers/BookingController');

module.exports = class extends BookingRepository {

  _initializeRepositoryWithOneBooking() {
    const booking = new Booking(null, Booking.PETROL, 4, Booking.NEW, 1, 1, 2, "2020-07-22T04:00:00.201Z");
    this.persist(booking).catch(error => console.error(error))
  }

  _dataAsArray() {
    return Object.keys(this.data).map(key => this.data[key]);
  }

  constructor() {
    super();
    this.index = 1;
    this.data = {};
    this._initializeRepositoryWithOneBooking();
  }

  persist(bookingEntity) {
    const row = Object.assign({}, bookingEntity);
    const rowId = ('id' in row) && row.id  ? row.id : this.index++;
    row.id = rowId;
    this.data[rowId] = row;
    return Promise.resolve(row);
  }

  merge(bookingEntity) {
    let row = this.data[bookingEntity.id];
    Object.assign(row, bookingEntity);
    return Promise.resolve(row);
  }

  remove(bookingId) {
    delete this.data[bookingId];
    return Promise.resolve();
  }

  get(bookingId) {
    return Promise.resolve(this.data[bookingId]);
  }


  find() {
    return Promise.resolve(this._dataAsArray());
  }


  findByCustomer(customerId) {
    const bookings = this._dataAsArray();
    return Promise.resolve(bookings.find(booking => booking.customerId === customerId));
  }


  findByFillerStaffId(fillerStaffId) {
    const bookings = this._dataAsArray();
    return Promise.resolve(bookings.find(booking => booking.fillerStaffId === fillerStaffId));
  }

};
