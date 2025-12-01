window.addEventListener("load", async () => {
  const submitbtn = document.getElementById("submitbtn");
  // const debitbtn = document.getElementById("debit")
  const emailIn = localStorage.getItem("clientEmailu");
  const transactionIDIn = localStorage.getItem("thistransactionid");
  var transaction = {};

  // console.log(transactionIDIn)
  try {
    const data = await axios.post(
      "https://apex-h7wm.onrender.com/apex/newtransaction/getOnetransaction",
      {
        transactionID: transactionIDIn,
      }
    );
    transaction = data.data.newtransactions[0];
    //    console.log(transaction)
  } catch (error) {
    console.log(error);
  }

  submitbtn.addEventListener("click", async () => {
    submitbtn.value = "Processing...";
    // const transactionID = transactionIDIn
    // console.log(transaction)
    try {
      const { asset, amount, transactionType, status, walletAddress, _id } =
        transaction;

      const newData = await axios.post(
        "https://apex-h7wm.onrender.com/apex/newtransaction/updatetransaction",
        {
          transactionID: _id,
          status: "Completed",
          email: emailIn,
          amount: amount,
          transactionType: transactionType,
          walletAddress: walletAddress,
          asset: asset,
        }
      );
      window.location = "../dashboard";
      //console.log(newData)
      submitbtn.value = "Completed!";
    } catch (error) {
      console.log(error);
    }
  });
});
