import { fetchJSON } from "../include/fetchJSON.js";
export async function fetchUniversities(query) {
    const url = `http://universities.hipolabs.com/search?name=${query}`;
    try {
        const data = await fetchJSON(url);
        const universities = data.map(university => university.name);
        return universities;
    }
    catch {
        return [];
    }
}
//# sourceMappingURL=fetchUniversities.js.map