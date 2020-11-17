import { writable } from "svelte/store";

export let user;

if (typeof window !== "undefined") {
   user = writable(JSON.parse(localStorage.getItem("userData")));
}
