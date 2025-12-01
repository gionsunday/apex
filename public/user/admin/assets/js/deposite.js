async function getAmount(clicker) {
  const emailIn = document.getElementById("email");
  const asset = document.getElementById("asset");
  const amountt = document.getElementById("amount");

  asset.value = clicker.id;
  console.log(clicker.textContent);
  console.log(asset.value);
  // console.log(amount)
  // localStorage.setItem('amount', amount)
}

window.addEventListener("load", () => {
  const topbtn = document.getElementById("topup");
  const debitbtn = document.getElementById("debit");
  const debitbtnwithdraw = document.getElementById("debitwith");
  const asset = document.getElementById("asset");
  const amountt = document.getElementById("amount");
  const emailIn = document.getElementById("email");
  const transactionid = document.getElementById("transactionid");

  topbtn.addEventListener("click", async () => {
    localStorage.setItem("clientEmailu", emailIn.value);
    localStorage.setItem("thistransactionid", transactionid.value);
    const client = await axios.post(
      "https://apex-h7wm.onrender.com/apex/auth/getoneclient",
      {
        email: emailIn.value,
      }
    );
    const user = client.data.user;

    if (asset.value == "USDT") {
      try {
        console.log(user.usdt);
        const data = await axios.post(
          "https://apex-h7wm.onrender.com/apex/auth/generalupdates",
          {
            email: emailIn.value,
            usdt: user.usdt + Number(amountt.value),
            totaldeposite: user.totaldeposite + Number(amountt.value),
          }
        );
        document.getElementById("alertsuccess").textContent =
          "Deposit Successfull";
        window.location = "../complete";
      } catch (error) {
        console.log(error);
      }
    } else if (asset.value == "BTC") {
      try {
        console.log(user.btc);
        const data = await axios.post(
          "https://apex-h7wm.onrender.com/apex/auth/generalupdates",
          {
            email: emailIn.value,
            btc: user.btc + Number(amountt.value),
            totaldeposite: user.totaldeposite + Number(amountt.value) * 42777,
          }
        );
        document.getElementById("alertsuccess").textContent =
          "Deposit Successfull";
        window.location = "../complete";
      } catch (error) {
        console.log(error);
      }
    } else if (asset.value == "BNB") {
      try {
        console.log(user.bnb);
        const data = await axios.post(
          "https://apex-h7wm.onrender.com/apex/auth/generalupdates",
          {
            email: emailIn.value,
            bnb: user.bnb + Number(amountt.value),
            totaldeposite: user.totaldeposite + Number(amountt.value) * 306,
          }
        );
        document.getElementById("alertsuccess").textContent =
          "Deposit Successfull";
        window.location = "../complete";
      } catch (error) {
        console.log(error);
      }
    } else if (asset.value == "ETH") {
      try {
        console.log(user.eth);
        const data = await axios.post(
          "https://apex-h7wm.onrender.com/apex/auth/generalupdates",
          {
            email: emailIn.value,
            eth: user.eth + Number(amountt.value),
            totaldeposite: user.totaldeposite + Number(amountt.value) * 2294,
          }
        );
        document.getElementById("alertsuccess").textContent =
          "Deposit Successfull";
        window.location = "../complete";
      } catch (error) {
        console.log(error);
      }
    } else {
      document.getElementById("alertsuccess").textContent =
        "Abeg Select Asset!";
    }
  });

  debitbtnwithdraw.addEventListener("click", async () => {
    localStorage.setItem("clientEmailu", emailIn.value);
    localStorage.setItem("thistransactionid", transactionid.value);
    const client = await axios.post(
      "https://apex-h7wm.onrender.com/apex/auth/getoneclient",
      {
        email: emailIn.value,
      }
    );
    const user = client.data.user;

    if (asset.value == "USDT") {
      try {
        console.log(user.usdt);
        const data = await axios.post(
          "https://apex-h7wm.onrender.com/apex/auth/generalupdates",
          {
            email: emailIn.value,
            withdrawableBalance:
              user.withdrawableBalance - Number(amountt.value),
            balanceInc: user.balanceInc + Number(amountt.value),
          }
        );
        document.getElementById("alertsuccess").textContent =
          "Deposit Successfull";
        window.location = "../complete";
      } catch (error) {
        console.log(error);
      }
    } else if (asset.value == "BTC") {
      try {
        console.log(user.btc);
        const data = await axios.post(
          "https://apex-h7wm.onrender.com/apex/auth/generalupdates",
          {
            email: emailIn.value,
            withdrawableBalance:
              user.withdrawableBalance - Number(amountt.value),
            balanceInc: user.balanceInc + Number(amountt.value) * 42777,
          }
        );
        document.getElementById("alertsuccess").textContent =
          "Deposit Successfull";
        window.location = "../complete";
      } catch (error) {
        console.log(error);
      }
    } else if (asset.value == "BNB") {
      try {
        console.log(user.bnb);
        const data = await axios.post(
          "https://apex-h7wm.onrender.com/apex/auth/generalupdates",
          {
            email: emailIn.value,
            withdrawableBalance:
              user.withdrawableBalance - Number(amountt.value),
            balanceInc: user.balanceInc + Number(amountt.value) * 305,
          }
        );
        document.getElementById("alertsuccess").textContent =
          "Deposit Successfull";
        window.location = "../complete";
      } catch (error) {
        console.log(error);
      }
    } else if (asset.value == "ETH") {
      try {
        console.log(user.eth);
        const data = await axios.post(
          "https://apex-h7wm.onrender.com/apex/auth/generalupdates",
          {
            email: emailIn.value,
            withdrawableBalance:
              user.withdrawableBalance - Number(amountt.value),
            balanceInc: user.balanceInc + Number(amountt.value) * 2294,
          }
        );
        document.getElementById("alertsuccess").textContent =
          "Deposit Successfull";
        window.location = "../complete";
      } catch (error) {
        console.log(error);
      }
    } else {
      document.getElementById("alertsuccess").textContent =
        "Abeg Select Asset!";
    }
  });

  debitbtn.addEventListener("click", async () => {
    localStorage.setItem("clientEmailu", emailIn.value);
    localStorage.setItem("thistransactionid", transactionid.value);
    const client = await axios.post(
      "https://apex-h7wm.onrender.com/apex/auth/getoneclient",
      {
        email: emailIn.value,
      }
    );
    const user = client.data.user;

    if (asset.value == "USDT") {
      if (Number(amountt.value) > user.usdt) {
        document.getElementById("alertsuccess").textContent =
          "Insufficent Client Balance";
      } else {
        try {
          console.log(user.usdt);
          const data = await axios.post(
            "https://apex-h7wm.onrender.com/apex/auth/generalupdates",
            {
              email: emailIn.value,
              usdt: user.usdt - Number(amountt.value),
              balanceInc: user.balanceInc + Number(amountt.value),
            }
          );
          document.getElementById("alertsuccess").textContent =
            "Deposit Successfull";
          window.location = "../complete";
        } catch (error) {
          console.log(error);
        }
      }
    } else if (asset.value == "BTC") {
      if (Number(amountt.value) > user.btc) {
        document.getElementById("alertsuccess").textContent =
          "Insufficent Client Balance";
      } else {
        try {
          console.log(user.btc);
          const data = await axios.post(
            "https://apex-h7wm.onrender.com/apex/auth/generalupdates",
            {
              email: emailIn.value,
              btc: user.btc - Number(amountt.value),
              balanceInc: user.balanceInc + Number(amountt.value) * 42777,
            }
          );
          document.getElementById("alertsuccess").textContent =
            "Deposit Successfull";
          window.location = "../complete";
        } catch (error) {
          console.log(error);
        }
      }
    } else if (asset.value == "BNB") {
      if (Number(amountt.value) > user.bnb) {
        document.getElementById("alertsuccess").textContent =
          "Insufficent Client Balance";
      } else {
        try {
          console.log(user.bnb);
          const data = await axios.post(
            "https://apex-h7wm.onrender.com/apex/auth/generalupdates",
            {
              email: emailIn.value,
              bnb: user.bnb - Number(amountt.value),
              balanceInc: user.balanceInc + Number(amountt.value) * 305,
            }
          );
          document.getElementById("alertsuccess").textContent =
            "Deposit Successfull";
          window.location = "../complete";
        } catch (error) {
          console.log(error);
        }
      }
    } else if (asset.value == "ETH") {
      if (Number(amountt.value) > user.eth) {
        document.getElementById("alertsuccess").textContent =
          "Insufficent Client Balance";
      } else {
        try {
          console.log(user.eth);
          const data = await axios.post(
            "https://apex-h7wm.onrender.com/apex/auth/generalupdates",
            {
              email: emailIn.value,
              eth: user.eth - Number(amountt.value),
              balanceInc: user.balanceInc + Number(amountt.value) * 2294,
            }
          );
          document.getElementById("alertsuccess").textContent =
            "Deposit Successfull";
          window.location = "../complete";
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      document.getElementById("alertsuccess").textContent =
        "Abeg Select Asset!";
    }
  });
});
