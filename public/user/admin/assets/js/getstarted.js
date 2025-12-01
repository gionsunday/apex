window.addEventListener("load", () => {
  const availableAccs = localStorage.getItem("LogprofileDetails");
  const accStatus = document.querySelector("#accountstatus");
  const accValue = document.querySelector("#accvalue");
  const accBtn = document.querySelector("#acctbtn");
  const getstartedAmount = localStorage
    .getItem("GetStartedAmount")
    .split(",")[0];
  const plan = localStorage.getItem("GetStartedAmount").split(",")[1];

  const availableAcc = availableAccs.split(",")[2];
  const email = availableAccs.split(",")[1];
  console.log(availableAcc);
  console.log(getstartedAmount);

  const remaining = availableAcc - getstartedAmount;
  console.log(remaining);

  if (remaining >= 0) {
    accStatus.style.display = "none";
    accBtn.addEventListener("click", async () => {
      try {
        const data = await axios.post(
          "https://apex-h7wm.onrender.com/apex/auth/updateactiveplan",
          {
            email: email,
            activePlan: plan,
            amount: getstartedAmount,
          }
        );
        console.log(data);
        window.location = "../dashboard";
      } catch (error) {
        console.log(error);
      }
    });
  } else {
    accBtn.style.opacity = "0.1";
    accStatus.style.display = "block";
    accStatus.classList.add("text-danger");
    accStatus.style.fontSize = "16px";
    accValue.style.fontSize = "16px";
    accValue.textContent = `Insuficient Balance: Deposit $${remaining} to continue`;
    accStatus.textContent = `Insuficient Balance: Deposit $${remaining} to continue`;
  }
});
