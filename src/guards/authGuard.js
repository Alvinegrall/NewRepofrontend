function authGuard(to, from, next) {
  if (to.matched.some((record) => record.meta.authRequired)) {
    console.log("authRequired +++++");
    if (localStorage.getItem("jwt")) {
      next();
    } else {
      next({ name: "create-page" });
    }
  } else {
    // La route ne nécessite pas d'authentification, continuez.
    next();
  }
}

export default authGuard;
