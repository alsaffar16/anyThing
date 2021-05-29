const functions = require("firebase-functions");

exports.getWheatherData = functions.https.onRequest((location, response)=>{
    fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          location.coords.latitude +
          "&lon=" +
          location.coords.longitude +
          "&units=metric&exclude=hourly,daily&appid=ef068df682a43913b9d1fadd684d3571",
        { method: "GET" }
      )
      .then((response) => response.json())
      .then((responseJson) => {
          response.send(responseJson);
      } )
});