import * as sapper from "@sapper/app";
import fire from "$config/firebaseConfig";

// Set "fire" to be global that can be access in anywhere
window.fire = fire.firestore();

sapper.start({
  target: document.querySelector("#sapper"),
});
