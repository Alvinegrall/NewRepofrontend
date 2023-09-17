const auth_refresh = async (CrossDomainStorage, AUTH_URL, store) => {
  return new Promise((resolve, reject) => {
    // const current_hash_id = store.getters["auth/hash_id"];

    let remoteStorage = new CrossDomainStorage(AUTH_URL, "/reload-auth");

    remoteStorage.requestValue("hash_id", async function (_key, value) {
      if (value.auth?.currentUser) {
        // console.log(value.auth?.currentUser);

        const { user } = JSON.parse(value.auth.currentUser);

        if (user.is_wallet_confirm == "0") {
          location.href = AUTH_URL;
        }

        // const hash_id = user.hash_id;
        // if (hash_id == current_hash_id) return resolve();
        // else {
        // await store.dispatch("auth/refreshuser", hash_id);
        await store.dispatch("auth/setCurrentUser", JSON.parse(value.auth.currentUser));
        // window.location.reload();
        // }
      } else {
        location.href = AUTH_URL;
        return reject({ message: "User not found" });
      }

      return resolve();
    });
  });
};

export default auth_refresh;
