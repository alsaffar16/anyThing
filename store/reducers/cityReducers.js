import { FAVORITE, SET_CITIES, DELETE } from "../actions/city";
import { cities } from "../../cities";

const intialState = {
  cities: cities,
  favoriteCities: [],
};

//return state & put break
const cityReducer = (state = intialState, action) => {
  switch (action.type) {
    case FAVORITE:
      const city = state.cities.find((city) => {
        return city.geonameid === action.cityID;
      });
      const index = state.favoriteCities.findIndex(
        (city) => city.geonameid === action.cityID
      );
      console.log(index);
      if (index >= 0) {
        return state;
      } else {
        console.log(city);
        const newArray = state.favoriteCities.concat(city);

        return { ...state, favoriteCities: newArray };
      }
      break;
    case SET_CITIES:
      const theCity = state.cities.find((theCity) => {
        return theCity.geonameid === action.cityID;
      });
      if (city >= 0) return state;
      else {
        const Array = state.favoriteCities.concat(theCity);

        return { ...state, favoriteCities: Array };
      }
      break;
    case DELETE:
      const existingIndex = state.favoriteCities.findIndex(
        (city) => city.geonameid === action.cityID
      );
      console.log(existingIndex);
      if (existingIndex >= 0) {
        const updatedCities = [...state.favoriteCities];
        updatedCities.splice(existingIndex, 1);
        return { ...state, favoriteCities: updatedCities };
      }
      break;
    default:
      return state;
  }
};

export default cityReducer;
