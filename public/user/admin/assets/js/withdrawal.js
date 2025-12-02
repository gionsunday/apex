// async function getAmount(clicker){
//   const emailIn = document.getElementById('email')
//   const asset = document.getElementById('asset')
//   const amountt = document.getElementById("amount")

//   asset.value = clicker.id
//   console.log(clicker.textContent)
//   console.log(asset.value)
//   // console.log(amount)
//   // localStorage.setItem('amount', amount)

// }

window.addEventListener("load", () => {
  const incbtn = document.getElementById("incbtn");

  const decbtn = document.getElementById("decbtn");
  // const debitbtn = document.getElementById('debit')
  // const asset = document.getElementById('asset')
  const amountt = document.getElementById("amount");
  const emailIn = document.getElementById("email");

  incbtn.addEventListener("click", async () => {
    const client = await axios.post("/apex/auth/getoneclient", {
      email: emailIn.value,
    });
    const user = client.data.user;
    console.log(user);
    try {
      // console.log(user.dailyEarnings)
      const data = await axios.post("/apex/auth/admin/generalupdates", {
        email: emailIn.value,
        withdrawableBalance: user.withdrawableBalance + Number(amountt.value),
      });
      document.getElementById("alertsuccess").textContent = "Successfull !";
      // window.location = '../dashboard'
    } catch (error) {
      console.log(error);
    }
  });

  decbtn.addEventListener("click", async () => {
    const client = await axios.post("/apex/auth/getoneclient", {
      email: emailIn.value,
    });
    const user = client.data.user;
    console.log(user);
    try {
      console.log(user.dailyEarnings);
      const data = await axios.post("/apex/auth/admin/generalupdates", {
        email: emailIn.value,
        withdrawableBalance: user.withdrawableBalance - Number(amountt.value),
      });
      document.getElementById("alertsuccess").textContent = "Successfull !";
      window.location = "../dashboard";
    } catch (error) {
      console.log(error);
    }
  });
});
