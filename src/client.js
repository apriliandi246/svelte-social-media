import * as sapper from "@sapper/app";
import firebase from "./config/firebaseConfig";

window.db = firebase.firestore();

sapper.start({
  target: document.querySelector("#sapper"),
});
