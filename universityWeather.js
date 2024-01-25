import { fetchGeoCoord } from "./fetchGeoCoord.js";
import { fetchUniversities } from "./fetchUniversities.js";
import { fetchCurrentTemperature } from "./fetchCurrentTemperature.js";
export function fetchUniversityWeather(universityQuery, transformName) {
    // TODO
    return helper(universityQuery, transformName);
}
//implement reject
async function helper(universityQuery, transformName) {
    const arr = await fetchUniversities(universityQuery).then(x => x.length > 0 ? x : Promise.reject(new Error("No results found for query.")));
    const obj = { totalAverage: 0 };
    const nArr = await Promise.all(arr
        .map(e => (transformName ? transformName(e) : e))
        .map(e => fetchGeoCoord(e).then(x => fetchCurrentTemperature(x))));
    for (let i = 0; i < arr.length; ++i) {
        const avg = nArr[i]["temperature_2m"].reduce((acc, e) => acc + e) / nArr[i]["temperature_2m"].length;
        obj[arr[i]] = avg;
        obj.totalAverage += avg;
    }
    obj.totalAverage /= arr.length;
    return obj;
}
export function fetchUMassWeather() {
    // TODO
    const func = (s) => s.replace(" at ", " ");
    return fetchUniversityWeather("University of Massachusetts", func);
}
export function fetchUCalWeather() {
    // TODO
    return fetchUniversityWeather("University of California");
}
//# sourceMappingURL=universityWeather.js.map