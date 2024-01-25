import { fetchJSON } from "../include/fetchJSON.js";
export async function fetchCurrentTemperature(coords) {
    const res = await fetchJSON(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m&temperature_unit=fahrenheit`);
    return {
        time: res.hourly.time,
        temperature_2m: res.hourly.temperature_2m,
    };
}
//# sourceMappingURL=fetchCurrentTemperature.js.map