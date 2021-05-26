export const FAVORITE = "FAVORITE";

export function changeCity(cityID) {
  return {
    type: FAVORITE,
    cityID: cityID,
  };
}
