window.addEventListener("load", async () => {
  const dashboard = localStorage.getItem("dashboard");
  const userId = dashboard.split(",")[4];
  console.log(userId);
  const myTransactions = await axios.get(
    `https://apex-h7wm.onrender.com/apex/newtransaction/${userId}`
  );
  const transactions = myTransactions.data.newtransactions;

  if (transactions.length !== 0) {
    transactions.forEach((transaction) => {
      const {
        _id,
        transactionType,
        asset,
        amount,
        status,
        walletAddress,
        updatedAt,
      } = transaction;

      const totalAmount = `${amount}${asset}`;

      const colDiv = document.createElement("div");
      colDiv.classList.add("col-12");

      const containerDiv = document.createElement("div");
      containerDiv.classList.add("card");

      const bodyDiv = document.createElement("div");
      bodyDiv.classList.add("card-header");

      const h51 = document.createElement("h5");
      h51.classList.add("card-title");
      h51.classList.add("mb-4");
      h51.classList.add("badge");
      h51.classList.add("bg-primary");
      h51.style.width = "100%";
      h51.style.color = "white ";
      h51.style.textAlign = "center";
      h51.textContent = "Transaction";
      h51.style.display = "none";

      const h52 = document.createElement("h5");
      h52.classList.add("card-title");
      h52.classList.add("mb-2");
      h52.textContent = "Transaction ID: ";
      const h52span = document.createElement("span");
      h52span.classList.add("badge");
      h52span.classList.add("bg-primary");
      h52span.classList.add("mb-2");
      h52span.textContent = _id;
      h52.appendChild(h52span);

      const h53 = document.createElement("h5");
      h53.classList.add("card-title");
      h53.classList.add("mb-2");
      h53.textContent = "Type: ";
      const h53span = document.createElement("span");
      h53span.classList.add("badge");
      h53span.classList.add("bg-secondary");
      h53span.classList.add("mb-2");
      h53span.textContent = transactionType;
      h53.appendChild(h53span);

      const h54 = document.createElement("h5");
      h54.classList.add("card-title");
      h54.classList.add("mb-2");
      h54.textContent = "Amount: ";
      const h54span = document.createElement("span");
      h54span.textContent = totalAmount;
      h54.appendChild(h54span);

      const h55 = document.createElement("h5");
      h55.classList.add("card-title");
      h55.classList.add("mb-2");
      h55.textContent = "To: ";
      const h55span = document.createElement("span");
      h55span.classList.add("badge");
      h55span.classList.add("bg-dark");
      h55span.classList.add("mb-2");
      h55span.textContent = walletAddress;
      h55.appendChild(h55span);

      const h56 = document.createElement("h5");
      h56.classList.add("card-title");
      h56.classList.add("mb-2");
      h56.textContent = "Transaction Time: ";
      const h56span = document.createElement("span");
      h56span.classList.add("badge");
      h56span.classList.add("bg-primary");
      h56span.classList.add("mb-2");
      h56span.textContent = updatedAt;
      h56.appendChild(h56span);

      const h57 = document.createElement("h5");
      h57.classList.add("card-title");
      h57.classList.add("mb-2");
      h57.textContent = "Status: ";
      const h57span = document.createElement("span");
      h57span.classList.add("badge");
      if (status.toLowerCase() === "processing") {
        h57span.classList.add("bg-warning");
      } else if (status.toLowerCase() === "cancelled") {
        h57span.classList.add("bg-danger");
      } else {
        h57span.classList.add("bg-success");
      }
      h57span.classList.add("mb-2");
      h57span.textContent = status;
      h57.appendChild(h57span);

      bodyDiv.appendChild(h51);
      bodyDiv.appendChild(h52);
      bodyDiv.appendChild(h53);
      bodyDiv.appendChild(h54);
      bodyDiv.appendChild(h55);
      bodyDiv.appendChild(h56);
      bodyDiv.appendChild(h57);

      containerDiv.appendChild(bodyDiv);
      colDiv.appendChild(containerDiv);
      document.getElementById("row").appendChild(colDiv);
    });
  } else {
    const h51 = document.createElement("h5");
    h51.classList.add("card-title");
    h51.classList.add("mb-4");
    h51.classList.add("badge");
    h51.classList.add("bg-secondary");
    h51.style.width = "100%";
    h51.style.color = "white";
    h51.style.textAlign = "center";
    h51.textContent = "You have made no transaction yet";

    document.getElementById("row").appendChild(h51);
  }
});
