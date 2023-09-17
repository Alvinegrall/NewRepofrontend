export const AUTH_URL = "http://localhost:5173";  
// const AUTH_URL = "http://auth.farotygo.com";
// export const AUTH_URL = "https://auth.faroty.com";

import store from "@/store";

import CrossDomainStorage from "./CrossDomainStorage";
import auth_logout from "./logout";
import auth_refresh from "./refresh-auth";

export function farotyLogin() {
  return auth_refresh(CrossDomainStorage, AUTH_URL, store);
}

export function farotyLogout() {
  return auth_logout(CrossDomainStorage, AUTH_URL);
}
