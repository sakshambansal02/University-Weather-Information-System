import { fetchJSON } from "../include/fetchJSON.js";
export function fetchGeoCoord(query) {
    // TODO
    return helper(query);
}
async function helper(query) {
    const url = makeGeocodeURL(query);
    const json = await fetchJSON(url).then(json => Array.isArray(json) && json.length > 0 ? json : Promise.reject(new Error("No results found for query.")));
    const lat = Number.parseFloat(json[0].lat);
    const lon = Number.parseFloat(json[0].lon);
    return { lat: lat, lon: lon };
}
export function makeGeocodeURL(query) {
    const searchURL = new URL("https://geocode.maps.co/search");
    searchURL.searchParams.append("q", query);
    return searchURL.toString();
}
//# sourceMappingURL=fetchGeoCoord.js.map