window.addEventListener("load", () => {
  const transaction = [];
  const amountT = localStorage.getItem("amount");
  const assett = document.querySelector("#asset");
  const depositebtn = document.querySelector("#depositebtn");

  depositebtn.addEventListener("click", async () => {
    depositebtn.textContent = "Processing...";
    const asset = assett.textContent;
    const transactionType = "Deposite";

    try {
      const { data } = await axios.post(
        "/apex/newtransaction",
        {
          transactionType: "Deposit",
          asset: asset,
          amount: amountT,
          walletAddress: "Apex wallet address",
        },
        { withCredentials: true }
      );
      console.log(data);
      const typeT = data.newtransaction.transactionType;
      const assetT = data.newtransaction.asset;
      const amount = data.newtransaction.amount;
      const status = data.newtransaction.status;
      const transId = data.newtransaction._id;
      const transwallet = data.newtransaction.walletAddress;
      const time = data.newtransaction.createdAt;
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
      depositebtn.textContent = "Processed";

      Toastify({
        text: "Deposit request submitted successfully!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#28a745",
      }).showToast();
      
      window.location = "../prehistory";
    } catch (error) {
      console.log(error);
      Toastify({
        text: error.response?.data?.error || "Failed to submit deposit!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#dc3545",
      }).showToast();

      depositebtn.textContent = "Try Again";
    }
  });
});
