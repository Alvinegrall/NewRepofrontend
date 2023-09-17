import store from "../store";

export default (to, from, next) => {
  let redirectName = from.href ? from.name : "common.home";

  if (store.getters["auth/has_page"]) {
    next({ name: redirectName });
  }
};
