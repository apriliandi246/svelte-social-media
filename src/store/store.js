import { writable } from "svelte/store";

export let user;
export const homeFetch = writable(false);
export const isUserFetch = writable(false);
export const profileFetch = writable(false);

if (typeof window !== "undefined") {
   user = writable(JSON.parse(localStorage.getItem("userData")));
}
