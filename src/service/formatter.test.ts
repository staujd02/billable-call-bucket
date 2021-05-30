import { formatHoursMinutesSeconds } from "./formatter"

describe("The formatter service", () => {

    describe("when formatting a duration", () => {
        it("correctly formats a call less than 10 seconds", () => {
            expect(formatHoursMinutesSeconds(5)).toEqual("00m 05s");
        });
        it("correctly formats a call over 10 seconds", () => {
            expect(formatHoursMinutesSeconds(15)).toEqual("00m 15s");
        });
        it("correctly formats a call over a minute", () => {
            expect(formatHoursMinutesSeconds(75)).toEqual("01m 15s");
        });
        it("correctly formats a call over 10 minutes", () => {
            expect(formatHoursMinutesSeconds(675)).toEqual("11m 15s");
        });
        it("correctly formats a call over an hour", () => {
            expect(formatHoursMinutesSeconds(3675)).toEqual("1h 01m 15s");
        });
    })
})