import { checkUrl } from "../src/client/js/urlChecker";


describe("Testing the correct url protocol is correct", () => {
    test("Testing the checkUrl() function", () => {
        const input = "https://www.nytimes.com/2021/04/13/health/blood-clots-johnson-vaccine.html";
        expect(checkUrl(input)).toBe(true)
    })});

describe("Testing the correct url protocol is incorrect", () => {
    test("Testing the checkUrl() function", () => {
        const input = "nytimes/2021/04/13/health/blood-clots-johnson-vaccine.html";
        expect(checkUrl(input)).toBe(false)
    })});
