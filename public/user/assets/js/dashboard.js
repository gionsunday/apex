

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const { data } = await axios.get("http://localhost:8080/apex/user/dashboard", {
      withCredentials: true,
    });

    console.log("Dashboard data:", data);

    // show dashboard only after successful check
    document.getElementById("content").style.display = "block";

    // optionally populate the dashboard with data
    // e.g., document.getElementById("username").textContent = data.username;

  } catch (err) {
    if (err.response?.status === 401) {
      // redirect if JWT missing or invalid
      window.location.href = "/user/login";
    } else {
      console.error(err);
    }
  }
});

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
        "http://localhost:8080/apex/auth/dashboard",
        {
          withCredentials: true, // <-- IMPORTANT
        }
      );

      console.log(data);
      const isEmpty = Object.keys(data).length === 0;
      if (isEmpty) {
        console.log("Wrong Value Entered for Email or Passwor");
      } else if (data.user.blocked == "true") {
        window.location = "../blocked";
      } else if (data.user.accountType == "admin") {
        window.location = "../admin/dashboard";
      } else {
        const token = data.token;
        const username = data.user.name;
        const emailuSER = data.user.email;
        const id = data.user.id;
        dataDashboard.push(token, password, username, emailuSER, id);
        // console.log(isBlocked)

        //console.log(dataDashboard)
        localStorage.setItem("dashboard", dataDashboard);
        window.location = "../dashboard";

        document.getElementById("status").textContent = "token present";
      }
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
