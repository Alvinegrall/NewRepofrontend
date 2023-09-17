import { AUTH_URL } from "../helpers/auth";
import store from "../store";

export default (to, from, next) => {
  if (
    !store.getters["auth/token"] ||
    !store.getters["auth/is_confirm"] ||
    !store.getters["auth/is_wallet_confirm"]
  ) {
    if (from.href) next({ name: from.name });
    else {
      location.href = AUTH_URL;
      // location.href = "http://localhost:4000";
      next({ name: "login" });
    }
  }
};
