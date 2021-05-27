import { FAVORITE } from "./changes";
import { cities } from "../cities";

const intialState = {
  cities: cities,
  loggedIn: false,
  favoriteCities: [],
};

const cityReducer = (state = intialState, action) => {
  switch (action.type) {
    case FAVORITE:
      const city = state.cities.find((city) => {
        return city.geonameid === action.cityID;
      });

      const newArray = state.favoriteCities.concat(city);
      return { ...state, favoriteCities: newArray };

    case "LOGGEDIN":
      return { ...state, loggedIn: true };
    default:
      return state;
  }
};

export default cityReducer;
