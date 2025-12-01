window.addEventListener("load", async () => {
  const acctbtn = document.querySelector("#acctbtn");
  const accStatus = document.querySelector("#accountstatus");
  const withbtn = document.querySelector("#withbtn");
  const accValue = document.querySelector("#accvalue");
  const email = localStorage.getItem("LogprofileDetails").split(",")[1];
  const allerror = document.querySelector("#allerror");
  const witherror = document.querySelector("#witherror");

  try {
    const client = await axios.post(
      "http://localhost:8080/apex/auth/getoneclient",
      {
        email: email,
      }
    );
    const user = client.data.user;
    // acctbtn.style.display = "block"
    // withbtn.style.display = "block"
    const { withdrawableBalance, status } = user;
    withbtn.value = `From Withdrawable Balance (Balance : $${withdrawableBalance})`;

    // if (status == "Temporarily Unavailable") {
    //     acctbtn.style.cursor = "not-allowed"
    //     acctbtn.style.opacity = "0.5"
    //     acctbtn.addEventListener('click', (e) => {
    //         accStatus.style.fontSize = "16px"
    //         accValue.style.fontSize = "16px"
    //         accValue.textContent = ``
    //         accStatus.textContent = `You can not withdraw from main account at this moment.
    //          Please, contact support for more info.`

    //     })
    // }

    if (status == "Temporarily Unavailable" && withdrawableBalance <= 0) {
      acctbtn.style.cursor = "not-allowed";
      acctbtn.style.opacity = "0.2";
      withbtn.style.cursor = "not-allowed";
      withbtn.style.opacity = "0.2";
      allerror.style.display = "block";

      acctbtn.style.display = "block";
      withbtn.style.display = "block";
      withbtn.addEventListener("click", () => {
        witherror.style.display = "block";
      });
      acctbtn.addEventListener("click", (e) => {
        accStatus.style.fontSize = "16px";
        accValue.style.fontSize = "16px";
        accValue.textContent = ``;
        accStatus.textContent = `You can not withdraw from main account at this moment.
                 Please, contact support for more info.`;
      });
    } else if (status == "Okay" && withdrawableBalance >= 0) {
      withbtn.style.cursor = "pointer";
      withbtn.style.opacity = "1";
      acctbtn.style.cursor = "pointer";
      acctbtn.style.opacity = "1";
      acctbtn.style.display = "block";
      withbtn.style.display = "block";
      withbtn.addEventListener("click", () => {
        localStorage.setItem("where", "from_withdrawable_balance");
        window.location = "../withdraw";
      });
      acctbtn.addEventListener("click", () => {
        localStorage.setItem("where", "from_main_balance");
        window.location = "../withdraw";
      });
    } else if (status == "Okay" && withdrawableBalance <= 0) {
      withbtn.style.cursor = "none";
      withbtn.style.opacity = "0.2";
      acctbtn.style.cursor = "pointer";
      acctbtn.style.opacity = "1";
      acctbtn.style.display = "block";
      //withbtn.style.display = "block"
      acctbtn.addEventListener("click", () => {
        localStorage.setItem("where", "from_main_balance");
        this.window.location = "../withdraw";
      });
    } else if (
      status == "Temporarily Unavailable" &&
      withdrawableBalance >= 0
    ) {
      withbtn.style.cursor = "pointer";
      withbtn.style.opacity = "1";
      acctbtn.style.cursor = "not-allowed";
      acctbtn.style.opacity = "0.2";
      withbtn.style.display = "block";
      withbtn.addEventListener("click", () => {
        localStorage.setItem("where", "from_withdrawable_balance");
        window.location = "../withdraw";
      });
      acctbtn.addEventListener("click", (e) => {
        accStatus.style.fontSize = "16px";
        accValue.style.fontSize = "16px";
        accValue.textContent = ``;
        accStatus.textContent = `You can not withdraw from main account at this moment.
                 Please, contact support for more info.`;
      });
    }

    // else {
    //     alert("d")
    // }
    //console.log(user)
  } catch (error) {
    console.log(error);
  }
});
