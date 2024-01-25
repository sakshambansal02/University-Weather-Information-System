import assert from "assert";
import { fetchUniversities } from "./fetchUniversities.js";
describe("fetchUniversities", () => {
    jest.setTimeout(10000);
    it("follows type specification", () => {
        const promise = fetchUniversities("University of Massachusetts at Amherst");
        return promise.then(result => {
            assert(Array.isArray(result)); // Assert the result in an array
            assert(result.every(x => typeof x === "string")); // Assert each element in the array is a string
        });
    });
    it("works with uCal", () => {
        const promise = fetchUniversities("University of California");
        return promise.then(result => {
            assert(result[0].includes("University of California"));
        });
    });
    it("returns an empty array if no results", () => {
        const promise = fetchUniversities("Not a real university");
        return promise.then(result => {
            assert(result.length === 0);
        });
    });
});
//# sourceMappingURL=fetchUniversities.test.js.map