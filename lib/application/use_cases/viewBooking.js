module.exports = async (bookingId, {bookingRepository}) => {
  const booking = await bookingRepository.get(bookingId);
  return booking;
}
