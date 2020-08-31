module.exports = async (bookingId, {bookingRepository, userRepository}) => {
  const booking = await bookingRepository.get(bookingId);
  if(!booking) throw new Error('No such booking record!');
  const customer = await userRepository.get(booking.customerId);
  // apply active filter
  if(!customer.isActive() || customer.isDeleted()) return "Account disabled"
  return customer;
}
