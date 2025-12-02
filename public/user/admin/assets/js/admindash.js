$(document).ready(async () => {
  "use strict";

  try {
    const allClients = await axios.post("/apex/auth/getallclients");
    const blockedClients = await axios.post("/apex/auth/getallblockedclients");
    $("#clients").text(allClients.data.clients.length + " Users");
    $("#activeclients").text(
      allClients.data.clients.length -
        blockedClients.data.clients.length +
        " Users"
    );
    $("#blockedclients").text(blockedClients.data.clients.length + " Users");
  } catch (error) {
    console.log(error);
  }
});
