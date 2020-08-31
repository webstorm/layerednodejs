const BookingController = require('../controllers/BookingController');
const joi = require('@hapi/joi');
module.exports = {
  name: 'bookings',
  version: '1.0.0',
  register: async (server) => {

    server.route([
      {
        method: 'GET',
        path: '/bookings',
        config: {
          auth: 'oauth-jwt',
          handler: BookingController.list,
          description: 'Make a booking',
          tags: ['api'],
        },
      },
      {
        method: 'POST',
        path: '/bookings',
        config: {
          auth: 'oauth-jwt',
          handler: BookingController.book,
          description: 'Make a booking',
          tags: ['api'],
          validate: {
            payload: joi.object().keys({
              type: joi.string().required(),
              qty: joi.number().required()
            }),
          }
        },
      },
      {
        method: 'GET',
        path: '/bookings/{bookingId}',
        config: {
          auth: 'oauth-jwt',
          handler: BookingController.view,
          description: 'View a booking',
          tags: ['api']
        },
      },
      {
        method: 'GET',
        path: '/bookings/{bookingId}/customer',
        config: {
          auth: 'oauth-jwt',
          handler: BookingController.viewCustomer,
          description: 'View the customer who made this booking',
          tags: ['api'],
        },
      },
      {
        method: 'GET',
        path: '/bookings/{bookingId}/staff',
        config: {
          auth: 'oauth-jwt',
          handler: BookingController.viewStaff,
          description: 'View the staff who fulFilled this booking',
          tags: ['api'],
        },
      }
    ]);
  }
};
