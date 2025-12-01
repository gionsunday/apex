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
      const res = await axios.post(
        "https://apex-h7wm.onrender.com/apex/auth/login",
        {
          email,
          password,
        }
      );

      if (!res?.data) {
        loginBtn.textContent = "Login";
        return Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Wrong email or password.",
        });
      }

      // Save token (if available)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful !",
        text: "Redirecting to dashboard...",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {
        window.location.href = "../dashboard";
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
