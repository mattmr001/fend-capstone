function tripClock(startDate, endDate){

    const d = new Date();

    this.dateToday = d.getMonth() + 1 + '-' + d.getDate() + '-' + d.getFullYear();
    this.startDate = startDate;
    this.endDate = endDate;

    this.calculateTripDuration = calculateDaysBetweenDates(this.startDate, this.endDate);
    this.calculateDaysUntilTrip = calculateDaysBetweenDates(this.dateToday, this.endDate);

     function calculateDaysBetweenDates(date1, date2){
        let startDate = new Date(date1);
        let endDate =  new Date(date2);

        let timeBetween = endDate.getTime() - startDate.getTime();
        // calculate days between dates by dividing the total of milliseconds in a day
        const daysBetween = timeBetween / (1000 * 60 * 60 * 24);

        console.log(daysBetween)
        return daysBetween
    };



}

export { tripClock }
