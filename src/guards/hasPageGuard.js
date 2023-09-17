import store from "../store";

export default (to, from, next) => {
  if (!store.getters["auth/has_page"]) {
    if (from.href) next({ name: from.name });
    else {
      next({ name: "create-page" });
    }
  }
};
