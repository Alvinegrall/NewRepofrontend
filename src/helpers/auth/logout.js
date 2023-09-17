const auth_logout = (CrossDomainStorage, AUTH_URL) => {
  let remoteStorage = new CrossDomainStorage(AUTH_URL, "/user-logout.html");

  remoteStorage.requestValue("hash_id", async function (key, value) {
    console.log(key, value);
    // window.location.reload();
    location.href = AUTH_URL;
  });
};

export default auth_logout;
