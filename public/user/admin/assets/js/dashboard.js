const dataDashboard = [];
window.addEventListener("load", () => {
  const form = document.querySelector("#form");
  const loginEmail = document.querySelector("#email");
  const loginPassword = document.querySelector("#password");
  const loginBtn = document.querySelector("#loginbtn");

  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = loginEmail.value;
    const password = loginPassword.value;
    if (!email || !password) {
    }
    try {
      const { data } = await axios.post(
        "https://apex-h7wm.onrender.com/apex/auth/dashboard",
        {
          email: email,
          password: password,
        }
      );
      const isEmpty = Object.keys(data).length === 0;
      if (isEmpty) {
        console.log("Wrong Value Entered for Email or Passwor");
      }
      const token = data.token;
      const username = data.user.name;
      const emailuSER = data.user.email;
      const id = data.user.id;
      dataDashboard.push(token, password, username, emailuSER, id);

      console.log(dataDashboard);
      localStorage.setItem("dashboard", dataDashboard);
      window.location = "../dashboard";

      document.getElementById("status").textContent = "token present";
    } catch (error) {
      localStorage.removeItem("token");
      console.log("Wrong Value Entered for Email or Password");
      setTimeout(() => {
        const alertT = document.getElementById("alert");
        alertT.classList.add("badge");
        alertT.classList.add("bg-danger");
        alertT.textContent = "Wrong Value Entered for Email or Password";
      }, 3000);

      setInterval(() => {
        const alertT = document.getElementById("alert");
        alertT.style.display = "none";
      }, 5000);
    }
  });
});
