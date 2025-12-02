window.addEventListener("load", () => {
  const logoutBtn = document.querySelector("#logoutbtn");
  logoutBtn.addEventListener("click", async () => {
    const data = await axios.post("/apex/auth/logout");
    // console.log(data);
    window.location = "../login";
  });
});
