const Booking = require('../../domain/Booking');


class StationSelectionService {
  from(condidates) {
    this.condidates = condidates;
    return this;
  }

  by(predicate) {
    return predicate(this.condidates);
  }

  first(items) {
    return items[0];
  }
}




module.exports = async (UserId,BookingType, BookingQty, { stationFinderService, bookingRepository }) => {
  let booking = new Booking(null, BookingType, BookingQty, Booking.NEW, UserId, null, 1, new Date(), null);
  booking = await bookingRepository.persist(booking);

  const condiateStations = await stationFinderService.by(BookingType).find();
  const stationSelectionService= new StationSelectionService();
  const randomSelectStratgy = (items) => items[Math.round(Math.random() * 10)];
  let result = null;

  while(!result) {
    result = stationSelectionService.from(condiateStations).by(randomSelectStratgy);
  }

  booking.fillingStationId = result.id;
  booking = await bookingRepository.persist(booking);
  return booking;
};
