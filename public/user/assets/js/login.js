window.addEventListener("load", () => {
  const form = document.querySelector("#form");
  const loginEmail = document.querySelector("#email");
  const loginPassword = document.querySelector("#password");
  const loginBtn = document.querySelector("#loginbtn");

 form.addEventListener("submit", async (e) => {
  e.preventDefault();

  loginBtn.textContent = "Logging in...";

  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  try {
    const res = await axios.post("/apex/auth/login", { email, password });

    if (!res?.data) {
      loginBtn.textContent = "Login";
      return Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Wrong email or password.",
      });
    }

    // Save token if returned
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    const accountType = res.data.accountType;
    localStorage.setItem("accountType", accountType);

    Swal.fire({
      icon: "success",
      title: "Login Successful!",
      text: "Redirecting...",
      timer: 1500,
      showConfirmButton: false,
    });

    setTimeout(() => {
      // Redirect based on account type
      if (accountType === "admin") {
        window.location.href = "../admin/dashboard";
      } else {
        // fallback for unknown types
        window.location.href = "../dashboard";
      }
    }, 1500);

  } catch (error) {
    console.log(error);
    localStorage.removeItem("token");

    Swal.fire({
      icon: "error",
      title: "Login Error",
      text: "Wrong email or password.",
    });

    loginBtn.textContent = "Login";
  }
});

});
