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

  const remaining = availableAcc - getstartedAmount;

  if (remaining >= 0) {
    accStatus.style.display = "none";

    accBtn.addEventListener("click", async () => {
      accBtn.textContent = "Processing...";
      
      try {
        const data = await axios.post("/apex/auth/updateactiveplan", {
          email: email,
          activePlan: plan,
          amount: getstartedAmount,
          totalBalance: remaining,
          dailyEarnings: 0.01,
        });

        Toastify({
          text: "Plan activated successfully!",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#28a745",
        }).showToast();

        setTimeout(() => {
          window.location = "../dashboard";
        }, 1200);

      } catch (error) {
        Toastify({
          text: error.response?.data?.error || "Error occurred!",
          duration: 3000,
          gravity: "top",
          position: "center",
          backgroundColor: "#dc3545",
        }).showToast();
      }
    });
  } else {

    Toastify({
      text: "Insufficient Balance. Deposit to continue.",
      duration: 3000,
      gravity: "top",
      position: "center",
      backgroundColor: "#dc3545",
    }).showToast();

    accBtn.style.opacity = "0.1";
    accStatus.style.display = "block";
    accValue.textContent = `Insufficient Balance: Deposit $${remaining} to continue`;
    accStatus.textContent = `Insufficient Balance: Deposit $${remaining} to continue`;
  }
});
