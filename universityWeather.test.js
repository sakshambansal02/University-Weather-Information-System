import assert from "assert";
import { fetchUCalWeather, fetchUMassWeather, fetchUniversityWeather } from "./universityWeather.js";
describe("fetchUCalWeather", () => {
    jest.setTimeout(10000);
    it("follows type specification", () => {
        jest.setTimeout(10000);
        const promise = fetchUCalWeather();
        return promise.then(result => {
            assert(typeof result === "object");
            assert(Object.keys(result).every(x => typeof x === "string"));
            assert(Object.values(result).every(x => typeof x === "number"));
            assert(result.totalAverage !== 0);
        });
    });
    it("works in basic case", () => {
        jest.setTimeout(10000);
        const promise = fetchUCalWeather();
        return promise.then(result => {
            assert(result.totalAverage > 0);
            assert(result.totalAverage < 100);
        });
    });
});
describe("fetchUMassWeather", () => {
    it("follows type specification", () => {
        const promise = fetchUMassWeather();
        return promise.then(result => {
            assert(typeof result === "object");
            assert(Object.keys(result).every(x => typeof x === "string"));
            assert(Object.values(result).every(x => typeof x === "number"));
            assert(result["University of Massachusetts at Dartmouth"]);
            assert(result.totalAverage !== 0);
        });
    });
});
describe("fetch University weather", () => {
    it("rejects with error when no query", () => {
        const promise = fetchUniversityWeather("Not a real university");
        return promise.catch(reason => {
            assert(reason instanceof Error);
        });
    });
    it("works with only one unviersity", () => {
        const func = (s) => s.replace(" at ", " ");
        const promise = fetchUniversityWeather("University of Massachusetts at Amherst", func);
        return promise.then(result => {
            assert(result.totalAverage === result["University of Massachusetts at Amherst"], `${result["University of Massachusetts at Amherst"]}`);
        });
    });
    it("calculates total average correctly", () => {
        const promise = fetchUniversityWeather("University of Michigan");
        return promise.then(result => {
            const avg = (result["University of Michigan-Flint"] +
                result["University of Michigan - Ann Arbor"] +
                result["University of Michigan - Dearborn"]) /
                3;
            assert(avg === result.totalAverage);
        });
    });
});
//# sourceMappingURL=universityWeather.test.js.map