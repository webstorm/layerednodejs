const ListBookings = require('../../application/use_cases/ListBookings');
const MakeBooking = require('../../application/use_cases/MakeBooking');
const viewBooking = require('../../application/use_cases/viewBooking');
const viewCustomerForBooking = require('../../application/use_cases/viewCustomerForBooking');
const viewStaffForBooking = require('../../application/use_cases/viewStaffForBooking');

module.exports = {
  book: (request) => {
    const {ioc} = request.server.app;
    const {uid: userId} = request.auth.credentials;
    const {type, qty, } = request.payload;
    return MakeBooking(userId, type, qty, ioc);
  },
  list: (request) => {
    const {ioc} = request.server.app;
    return ListBookings(ioc);
  },
  view: (request) => {
    const {ioc} = request.server.app;
    const {bookingId} = request.params;
    return viewBooking(bookingId, ioc);
  },
  viewCustomer: (request) => {
    const {ioc} = request.server.app;
    const {bookingId} = request.params;
    return viewCustomerForBooking(bookingId, ioc);
  },
  viewStaff: (request) => {
    const {ioc} = request.server.app;
    const {bookingId} = request.params;
    return viewStaffForBooking(bookingId, ioc);
  }
}
