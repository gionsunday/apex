window.addEventListener("load", () => {
  const transaction = [];
  // const dashboard = localStorage.getItem("dashboard");
  const details = localStorage.getItem("withdraw");
  const withdrawBtn = document.querySelector("#withdrawbtn");
  const asset = document.querySelector("#asset").value;
  const email = localStorage.getItem("LogprofileDetails").split(",")[1];
  const whereIn = localStorage.getItem("where");

  // const userId = dashboard.split(",")[4];
  const amountAct = details.split(",")[0];
  const walletAct = details.split(",")[1];

  withdrawBtn.addEventListener("click", async () => {
    withdrawBtn.textContent = "Processing...";
    try {
      const data = await axios.post(
        "/apex/newtransaction",
        {
          transactionType: "Withdrawal",
          // email: email,
          amount: amountAct,
          asset: asset,
          // createdBy: userId,
          where: whereIn,
          walletAddress: walletAct,
        },
        { withCredentials: true }
      );
      const typeT = data.data.newtransaction.transactionType;
      const assetT = data.data.newtransaction.asset;
      const amount = data.data.newtransaction.amount;
      const status = data.data.newtransaction.status;
      const transId = data.data.newtransaction._id;
      const transwallet = data.data.newtransaction.walletAddress;
      const time = data.data.newtransaction.createdAt;
      transaction.push(
        typeT,
        assetT,
        amount,
        status,
        transId,
        transwallet,
        time
      );

      localStorage.setItem("transaction", transaction);
      Toastify({
        text: "Withdrawal request submitted successfully!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#28a745",
      }).showToast();
      withdrawBtn.textContent = "Processed";
      window.location = "../prehistory";
    } catch (error) {
      console.log(error);

      Toastify({
        text:
          error.response?.data?.error || "Failed to submit withdrawal request!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#dc3545",
      }).showToast();

      document.getElementById("error").textContent =
        "Can not complete transaction at the moment, try again later";
      document.getElementById("error").style.color = "red";
      document.getElementById("error").style.textAlign = "center";
      console.log(
        "Can not complete transaction at the moment, try again later"
      );
    }
  });
});
