// TODO - Now its your turn to make the working example! :)
//teleport, quality of life
import { fetchJSON } from "../include/fetchJSON.js";
export async function makeCityChoice(query) {
    let location = await fetchJSON("https://api.teleport.org/api/cities/?search=" + query).then();
    let arr = [];
    try {
        location["_embedded"]["city:search-results"].forEach((x) => arr.push(x["matching_full_name"]));
        return arr;
    }
    catch {
        return [];
    }
}
export async function getScore(name) {
    let location = await fetchJSON("https://api.teleport.org/api/cities/?search=" + name);
    location = await fetchJSON(location["_embedded"]["city:search-results"][0]["_links"]["city:item"]["href"]);
    try {
        let slug = await fetchJSON(location["_links"]["city:urban_area"]["href"] + "scores/");
        let obj = { totalScore: slug["teleport_city_score"] / 100 };
        slug["categories"].forEach((x) => (obj[x.name] = x.score_out_of_10 / 10));
        return obj;
    }
    catch {
        return new Promise(resolve => resolve({ totalScore: 0 }));
    }
}
let input = prompt("Make a selection of city to see what its scores are: ");
if (typeof input === "string")
    makeCityChoice(input).then(console.log);
else
    console.log("Not a valid input");
input = prompt("Type in which full name you want to find the percentage scores of: ");
if (typeof input === "string")
    getScore(input).then(x => console.log(x.totalScore));
else
    console.log("Not a valid input");
//# sourceMappingURL=main.js.map