import { checkUrl } from "../src/client/js/urlChecker";
import { tripClock } from "../src/client/js/tripClock";

// instantiate new tripClock with parameters indicating the starting and ending dates of a trip
const cd = new tripClock("4-20-2021", "4-25-2021");

describe("Testing that today's date is correct", () => {
    test("Testing the countDown().genDateToday function", () => {
        expect(cd.dateToday).toBe("4-14-2021")
    })});

describe("Testing that the number of days in a trips duration is correct", () => {
    test("Testing the countDown().genDateToday function", () => {
        expect(cd.calculateTripDuration).toBe(5)
    })});

describe("Testing the days until a trip start-date is correct", () => {
    test("Testing the countDown().genDateToday function", () => {
        expect(cd.calculateDaysUntilTrip).not.toBe(10)
    })});

describe("Testing the days until a trips start-date is correct", () => {
    test("Testing the countDown().genDateToday function", () => {
        expect(cd.calculateDaysUntilTrip).toBe(11)
    })});
