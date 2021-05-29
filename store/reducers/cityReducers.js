import { FAVORITE, SET_CITIES, DELETE } from "../actions/city";
import { cities } from "../../cities";

const intialState = {
  cities: cities,
  favoriteCities: [],
};

const cityReducer = (state = intialState, action) => {
  
  switch (action.type) {
    case FAVORITE || "SET_CITIES":
      const city = state.cities.find((city) => {
        return city.geonameid === action.cityID;
      });
      if (city >=0)
        return;
        else {
          const newArray = state.favoriteCities.concat(city);
         
          return { ...state, favoriteCities: newArray };
        }
        case SET_CITIES:
          const theCity = state.cities.find((theCity) => {
            return theCity.geonameid === action.cityID;
          });
          if (city >=0)
            return;
            else {
              const Array = state.favoriteCities.concat(theCity);
             
              return { ...state, favoriteCities: Array };
            }

            case DELETE:
              const existingIndex = state.favoriteCities.findIndex(city => city.geonameid === action.cityID);
              console.log(existingIndex);
              if(existingIndex>=0){
                const updatedCities = [...state.favoriteCities];
                updatedCities.splice(existingIndex,1);
                return {...state, favoriteCities:updatedCities};
              }

    default:
      return state;
  }
};

export default cityReducer;
