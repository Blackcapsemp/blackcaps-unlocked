import { describe, expect, it } from "vitest";
import { createCityResolver, filterRoster, groupCities, type CityRow } from "./roster-cities";
const rows: CityRow[] = [
  ["Madrid", 40.4165, -3.70256, 3255944, []],
  ["Las Palmas de Gran Canaria", 28.09973, -15.41343, 381847, ["Las Palmas"]],
  ["Valencia", 39.46975, -0.37739, 814208, ["València"]],
];
const resolve = createCityResolver(rows);
describe("Public roster city rules", () => {
  it("groups case, accents and verified aliases into one city bubble", () => {
    const groups = groupCities([{city:" VALÈNCIA ",style:"DJ"},{city:"valencia",style:"Rap"}], resolve);
    expect(groups).toHaveLength(1); expect(groups[0]?.count).toBe(2);
  });
  it("keeps missing and unverified cities in the general catalog without fictitious positions", () => {
    const artists = [{city:"",style:"DJ"},{city:"Unverified city",style:"DJ"}];
    expect(filterRoster(artists,"Todos","",resolve)).toHaveLength(2);
    expect(groupCities(artists,resolve)).toEqual([{key:"unverified city",name:"Unverified city",count:1,location:null}]);
  });
  it("synchronizes city and style filters", () => {
    const artists = [{city:"Madrid",style:"DJ"},{city:"Madrid",style:"Rap"},{city:"Valencia",style:"DJ"}];
    expect(filterRoster(artists,"DJ","madrid",resolve)).toEqual([artists[0]]);
  });
  it("uses real Canary city centers", () => {
    expect(resolve("Las Palmas")).toEqual({name:"Las Palmas de Gran Canaria",lat:28.09973,lng:-15.41343});
  });
  it("does not guess ambiguous homonyms", () => {
    const lookup=createCityResolver([["Example",40,-3,1000,[]],["Example",42,2,900,[]]]);
    expect(lookup("Example")).toBeNull();
  });
});