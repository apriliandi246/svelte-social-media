import * as sapper from "@sapper/app";
import fire from "$config/firebaseConfig";

window.fire = fire.firestore();

sapper.start({
  target: document.querySelector("#sapper"),
});
