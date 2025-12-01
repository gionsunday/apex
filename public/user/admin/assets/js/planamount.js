window.addEventListener("load", () => {
  var emailIn = document.querySelector("#email");
  var capitalIn = document.querySelector("#capital");
  var planIn = document.querySelector("#plan");
  var profitIn = document.querySelector("#profit");
  const fetchBtn = document.querySelector("#fetchbtn");
  const stopbtn = document.querySelector("#stopbtn");
  var newUser = {};

  fetchBtn.addEventListener("click", async (e) => {
    fetchBtn.value = "Fetching...";
    e.preventDefault();
    try {
      const data = await axios.post(
        "https://apex-h7wm.onrender.com/apex/auth/getoneclient",
        {
          email: emailIn.value,
        }
      );
      const Nuser = data.data.user;
      fetchBtn.value = "Fetched!";
      const { activePlan, capital, dailyEarnings } = Nuser;
      newUser = data.data.user;
      capitalIn.value = capital;
      (planIn.value = activePlan), (profitIn.value = dailyEarnings);
      console.log(Nuser);
    } catch (error) {
      console.log(error);
    }
  });

  stopbtn.addEventListener("click", async (e) => {
    stopbtn.value = "Stoping Investment...";
    e.preventDefault();
    console.log(newUser);
    const { usdt, capital, dailyEarnings, withdrawableBalance, email } =
      newUser;
    try {
      const newTotalBal =
        Number(usdt) + Number(capital) + Number(dailyEarnings);
      console.log(newTotalBal);
      // const newusdt = Math.round(newTotalBal);
      // console.log(newusdt);
      const data = await axios.post(
        "https://apex-h7wm.onrender.com/apex/auth/generalupdates",
        {
          email: email,
          usdt: usdt + capital,
          withdrawableBalance: withdrawableBalance + dailyEarnings,
          capital: 0,
          dailyEarnings: 0,
          activePlan: "None",
        }
      );
      stopbtn.value = "Done Succefully!";
      this.window.location = "../dashboard";
    } catch (error) {
      console.log(error);
    }
  });
});
