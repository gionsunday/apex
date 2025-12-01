window.addEventListener("load", () => {
  const resetDetails = localStorage.getItem("passwordresetcode");
  const passwordR = document.querySelector("#resetpassword");
  const passwordC = document.querySelector("#confirmpassword");

  const resetbtn = document.querySelector("#passwordbtn");
  const alertnotmatched = document.querySelector("#passwordnotmatch");

  resetbtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = resetDetails.split(",")[1];

    const password1 = passwordR.value;
    const password2 = passwordC.value;

    if (!password1 || !password2 || password1 !== password2) {
      alertnotmatched.style.display = "block";
      alertnotmatched.textContent = "Password not matched";
    } else {
      try {
        const { data } = await axios.post(
          `https://apex-h7wm.onrender.com/apex/auth/forgotpassword/${email}`,
          { password: password1 }
        );

        passwordR.value = "";
        passwordC.value = "";

        console.log(data);

        window.location = "../login";
      } catch (error) {
        console.log(error);
        alertnotmatched.textContent = "Error, try again later.";
        alertnotmatched.style.display = "block";
      }
    }
  });
});
