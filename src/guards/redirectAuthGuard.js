import store from "../store";

export default (to, from, next) => {
  let redirectName = from.href ? from.name : "common.home";

  if (store.getters["auth/token"] && store.getters["auth/is_confirm"]) {
    next({ name: redirectName });
  }
};
