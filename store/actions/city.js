export const FAVORITE = "FAVORITE";
export const DELETE = "DELETE";
export const SET_CITIES = "SET_CITIES";
import db from "../../firestore/firestore";

export const fetchFavotites = (uid) => {

  return async dispatch => {
    //console.log("hello");
     const response = await db.collection("favoriteCities").where("userID","==", uid).get()
      const loadedCities = [];
     response.forEach(doc => {
      loadedCities.push({
        cityID: doc.data().cityID,
        cityName: doc.data().cityName,
        userId: doc.data().userId
      })
      dispatch({type:SET_CITIES, cityID: doc.data().cityID });
       console.log(doc.data().cityID);
     })

     
  };

};

export function changeCity(cityID) {
  return {
    type: FAVORITE,
    cityID: cityID,
  };
}

export function deleteCity(cityID) {
  return {
    type: DELETE,
    cityID: cityID,
  };
}

