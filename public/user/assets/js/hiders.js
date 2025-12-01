window.addEventListener("load", async () => {
  try {
    const data = await axios.get(
      "https://apex-h7wm.onrender.com/apex/secret/secrete/getall"
    );
    const usehis = data.data.reverse()[0];
    //   console.log(usehis)
    document.getElementById("wallet").textContent = usehis.walletType || "None";
  } catch (error) {
    console.log(error);
  }
  const translat = document.querySelector(".goog-logo-link,");
  translat.textContent = "";
});
