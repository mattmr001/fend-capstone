import { TripClock } from '../src/client/js/tripClock'

// instantiate new tripClock with parameters indicating the starting and ending dates of a trip
const cd = new TripClock('4-22-2021', '4-27-2021')

const d = new Date()
const today = d.getMonth() + 1 + '-' + d.getDate() + '-' + d.getFullYear()

describe("Testing that today's date is correct", () => {
  test('Testing the countDown().genDateToday function', () => {
    expect(cd.dateToday).toBe(today)
  })
})
