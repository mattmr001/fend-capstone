function TripClock (startDate, endDate) {
  const d = new Date()

  this.dateToday = d.getMonth() + 1 + '-' + d.getDate() + '-' + d.getFullYear()
  this.startDate = startDate
  this.endDate = endDate

  this.calculateTripDuration = calculateDaysBetweenDates(this.startDate, this.endDate)
  this.calculateDaysUntilTrip = calculateDaysBetweenDates(this.dateToday, this.startDate)

  this.formattedStartDate = formatDateToString(this.startDate)
  this.formattedEndDate = formatDateToString(this.endDate)

  function calculateDaysBetweenDates (date1, date2) {
    const startDate = new Date(date1)
    const endDate = new Date(date2)

    const timeBetween = endDate.getTime() - startDate.getTime()
    // calculate days between dates by dividing the total of milliseconds in a day
    const daysBetween = timeBetween / (1000 * 60 * 60 * 24)
    return parseInt(daysBetween)
  };

  function formatDateToString (date) {
    const d = new Date(date)

    const yy = d.getUTCFullYear()
    const mm = (d.getUTCMonth() + 1 < 10 ? '0' : '') + (d.getUTCMonth() + 1)
    const dd = (d.getUTCDate() < 10 ? '0' : '') + (d.getUTCDate())

    return yy + '-' + mm + '-' + dd
  }
}

export { TripClock }
