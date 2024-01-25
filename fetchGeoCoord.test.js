import assert from "assert";
import { fetchGeoCoord } from "./fetchGeoCoord.js";
describe("fetchGeoCoord", () => {
    it("works in basic case", () => {
        const promise = fetchGeoCoord("University of Massachusetts Amherst");
        return promise.then(result => {
            assert(result.lat === 42.3869382);
            assert(result.lon === -72.52991477067445);
        });
    });
    it("works with uCal", () => {
        const promise = fetchGeoCoord("University of California, Irvine");
        return promise.then(result => {
            assert(result.lat === 33.6431901);
            assert(result.lon === -117.84016493553044);
        });
    });
    it("follows type specification", () => {
        const promise = fetchGeoCoord("University of Massachusetts Amherst");
        return promise.then(result => {
            assert(typeof result === "object"); //  Assert the result is an object
            assert(typeof result.lon === "number"); // Assert that the lon value is a number
            assert(typeof result.lat === "number"); // Assert that the lat value is a number
            assert(Object.keys(result).length === 2); // Assert there are only two keys in the object
        });
    });
    it("works with empty json", () => {
        const promise = fetchGeoCoord("Sumfield");
        return promise.catch(reason => {
            assert(reason instanceof Error);
        });
    });
});
//# sourceMappingURL=fetchGeoCoord.test.js.map