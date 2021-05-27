export const FAVORITE = "FAVORITE";

export function changeCity(cityID) {
  return {
    type: FAVORITE,
    cityID: cityID,
  };
}

export const LoggedIn = (user) => {
  return {
    type: "LOGGEDIN",
    payload: user,
  };
};
