import db from "./firestore";
import React, {  useState,useEffect } from "react";

export default function  getFavoriteCities(uid) {    

     db.collection("favoriteCities").where("userID","==", uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

            setCity(doc.data)
            console.log( doc.data());
      });
    })
    console.log(data);
  }