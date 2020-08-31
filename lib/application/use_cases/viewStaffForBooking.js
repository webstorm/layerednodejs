module.exports = async (bookingId, {bookingRepository, userRepository}) => {
  const booking = await bookingRepository.get(bookingId);
  const staff = await userRepository.get(booking.fillerStaffId);
  if(!staff.isActive() || staff.isDeleted()) return "Account disabled"
  return staff;
}
