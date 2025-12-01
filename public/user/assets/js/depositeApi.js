window.addEventListener("load", () => {
  const transaction = [];
  const amountT = localStorage.getItem("amount");
  const assett = document.querySelector("#asset");
  const depositebtn = document.querySelector("#depositebtn");


  depositebtn.addEventListener("click", async () => {
    const asset = assett.textContent;
    const transactionType = "Deposite";

    try {
      const { data } = await axios.post(
        "http://localhost:8080/apex/newtransaction",
        {
          transactionType: "Deposit",
          asset: asset,
          amount: amountT,
          walletAddress: "Apex wallet address",
        }
        , { withCredentials: true }
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

      window.location = "../prehistory";
    } catch (error) {
      console.log(error);
    }
  });
});
