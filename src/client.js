import * as sapper from "@sapper/app";
import fire from "./config/firebaseConfig";

window.db = fire.firestore();

sapper.start({
   target: document.querySelector("#sapper"),
});
