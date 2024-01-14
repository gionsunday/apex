window.addEventListener("load", async function () {
  const equBtc = document.querySelector("#equibtc");
  const equUsdt = document.querySelector("#equiusdt");
  const equBnb = document.querySelector("#equibnb");
  const equEth = document.querySelector("#equieth");

  const userDataRef = localStorage.getItem("dashboard");
  const email = userDataRef.split(",")[3];
  const password = userDataRef.split(",")[1];
  const token = userDataRef.split(",")[0];
  const profileDetails = [];
  const activeplans = [];
  console.log(userDataRef);
  if (!token) {
    console.log("no token");
  }
  try {
    const data = await axios.post("/apex/auth/login", {
      email,
      password,
      Headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!data) {
      console.log("Wrong email or password");
    }
    console.log(data.data.accounts.balance);
    const user = data.data.user;
    const accounts = data.data.accounts;
    console.log(user.name);
    const name = user.name;
    const notifications = user.notifications;
    const referalLink = user.referlink;

    this.localStorage.setItem("Notifications", notifications);

    const UserEmail = user.email;
    const withdrawableBalanced = user.withdrawableBalance.$numberDecimal;
    const beforeW = accounts.beforeW.$numberDecimal;
    const activeplan = accounts.activeplan;
    const depositeBonus = accounts.depositeBonus.$numberDecimal;
    const signupBonus = accounts.signupBonus.$numberDecimal;
    const referalBonus = accounts.referalBonus.$numberDecimal;
    const referalcode = user.referalCode;
    const status = accounts.statu;
    const wallet = accounts.connectWallet;
    const capital = accounts.capital.$numberDecimal;
    const dailyEarnings = accounts.dailyEarnings.$numberDecimal;
    const earnings = accounts.earnigs.$numberDecimal;
    const deposite = accounts.deposite.$numberDecimal;
    const bnb = accounts.bnb.$numberDecimal;
    const usdt = accounts.usdt.$numberDecimal;
    const eth = accounts.eth.$numberDecimal;
    const btc = accounts.btc.$numberDecimal;
    const asset = accounts.asset;
    const timeT = accounts.time;
    const depositeAmount = accounts.depositeAmount.$numberDecimal;

    activeplans.push(activeplan);
    console.log(capital.$numberDecimal);
    const Ebtc = Number(btc) * 20418.5;
    equBtc.textContent = "$" + Number(Ebtc).toFixed(2);
    const Eusdt = Number(usdt) * 1;
    equUsdt.textContent = "$" + Number(Eusdt).toFixed(2);
    const Ebnb = Number(bnb) * 289.5;
    equBnb.textContent = "$" + Number(Ebnb).toFixed(2);
    const Eeth = Number(eth) * 1578.84;
    equEth.textContent = "$" + Number(Eeth).toFixed(2);

    const totalAvaliableBalance = Number(
      Ebtc + Eusdt + Ebnb + Eeth + earnings - capital,
    ).toFixed(2);

    const totalAvaliableBalanced = Number(Ebtc + Eusdt + Ebnb + Eeth).toFixed(
      2,
    );
    const totaldeposite = Number(Ebtc + Eusdt + Ebnb + Eeth).toFixed(2);
    profileDetails.push(name, UserEmail, totalAvaliableBalanced);

    localStorage.setItem("LogprofileDetails", profileDetails);
    localStorage.setItem("activeplans", activeplans);
    localStorage.setItem("wallet", wallet);
    localStorage.setItem("status", status);

    document.querySelector("#user").textContent = name;
    // plan

    //assets
    const initialAsset = "0.00";
    document.querySelector("#btc").textContent = btc || initialAsset;
    document.querySelector("#usdt").textContent = usdt || initialAsset;
    document.querySelector("#eth").textContent = eth || initialAsset;
    document.querySelector("#bnb").textContent = bnb || initialAsset;

    ///avaliableBalance
    const avaliableBalance = document.createElement("h1");
    avaliableBalance.classList.add("mt-1");
    avaliableBalance.classList.add("mb-3");
    avaliableBalance.textContent = `$${totalAvaliableBalance}`;
    document.getElementById("balance").appendChild(avaliableBalance);

    const divBalance = document.createElement("div");
    divBalance.classList.add("mb-0");

    const spanBalance = document.createElement("span");
    spanBalance.classList.add("text-success");
    spanBalance.innerText = `+${dailyEarnings}%`;

    const balanceT = document.createElement("i");
    balanceT.classList.add("mdi");
    balanceT.classList.add("mdi-arrow-bottom-right");

    const profSpan1 = document.createElement("span");
    profSpan1.classList.add("text-muted");
    profSpan1.textContent = " Since last week";
    divBalance.appendChild(spanBalance);
    spanBalance.appendChild(balanceT);
    divBalance.appendChild(profSpan1);
    document.getElementById("balance").appendChild(divBalance);

    ///BONUSES
    var totalBonuss =
      Number(depositeBonus) + Number(signupBonus) + Number(referalBonus);
    const totalBonus = document.createElement("h1");
    totalBonus.classList.add("mt-1");
    totalBonus.classList.add("mb-3");
    totalBonus.textContent = `$${totalBonuss}`;
    document.getElementById("bonuses").appendChild(totalBonus);

    const divBonus = document.createElement("div");
    divBonus.classList.add("mb-0");

    const spanBonus1 = document.createElement("span");
    spanBonus1.classList.add("text-success");
    spanBonus1.innerText = `~`;

    const bonus1 = document.createElement("i");
    bonus1.classList.add("mdi");
    bonus1.classList.add("mdi-arrow-bottom-right");

    const lineBreak1 = document.createElement("br");
    const bonusSpan1 = document.createElement("span");
    bonusSpan1.classList.add("text-muted");
    bonusSpan1.textContent = `Deposit bonus: $${depositeBonus}`;
    bonusSpan1.appendChild(lineBreak1);
    divBonus.appendChild(spanBonus1);
    spanBonus1.appendChild(bonus1);
    divBonus.appendChild(bonusSpan1);

    const spanBonus2 = document.createElement("span");
    spanBonus2.classList.add("text-success");
    //  spanBonus2.innerText = `~`;

    const bonus2 = document.createElement("i");
    bonus2.classList.add("mdi");
    bonus2.classList.add("mdi-arrow-bottom-right");

    const lineBreak2 = document.createElement("br");
    //  const bonusSpan2 = document.createElement('span');
    //  bonusSpan2.classList.add('text-dark');
    //  bonusSpan2.textContent = `Sign Up bonus: $${signupBonus}`
    //  bonusSpan2.appendChild(lineBreak2)
    divBonus.appendChild(spanBonus2);
    spanBonus2.appendChild(bonus2);
    //  divBonus.appendChild(bonusSpan2);

    const spanBonus3 = document.createElement("span");
    spanBonus3.classList.add("text-success");
    spanBonus3.innerText = `~`;

    const bonus3 = document.createElement("i");
    bonus3.classList.add("mdi");
    bonus3.classList.add("mdi-arrow-bottom-right");
    const lineBreak3 = document.createElement("br");
    const bonusSpan3 = document.createElement("span");
    bonusSpan3.classList.add("text-muted");
    bonusSpan3.textContent = `Referal bonus: $${referalBonus}`;
    bonusSpan3.appendChild(lineBreak3);
    divBonus.appendChild(spanBonus3);
    spanBonus3.appendChild(bonus3);
    divBonus.appendChild(bonusSpan3);
    document.getElementById("bonuses").appendChild(divBonus);

    this.document.getElementById("referalcode").value =
      referalcode || "Not Available";
    this.document.getElementById("referallink").value =
      referalLink || "Getting Link...";

    ///withdrawaable
    const withdrawableBalance = document.createElement("h1");
    withdrawableBalance.classList.add("mt-1");
    withdrawableBalance.classList.add("mb-3");
    withdrawableBalance.textContent = `$${withdrawableBalanced}`;
    document
      .getElementById("withdrawalbalbalance")
      .appendChild(withdrawableBalance);

    const divwithdrawable = document.createElement("div");
    divwithdrawable.classList.add("mb-0");

    const spanwithdrawable = document.createElement("span");

    if (beforeW === 1) {
      spanwithdrawable.innerText = `Your bonus is ready`;
      spanwithdrawable.classList.add("text-success");
    } else {
      // spanwithdrawable.innerText = `deposite $${beforeW} to unlock your bonuse`;
      spanwithdrawable.classList.add("text-muted");
    }

    const withdrawableT = document.createElement("i");
    withdrawableT.classList.add("mdi");
    withdrawableT.classList.add("mdi-arrow-bottom-right");

    divwithdrawable.appendChild(spanwithdrawable);
    spanwithdrawable.appendChild(withdrawableT);

    document
      .getElementById("withdrawalbalbalance")
      .appendChild(divwithdrawable);
    //deposite

    const availabledeposite = document.createElement("h1");
    availabledeposite.classList.add("mt-1");
    availabledeposite.classList.add("mb-3");
    availabledeposite.textContent = `$${totaldeposite}`;
    document.getElementById("deposite").appendChild(availabledeposite);
    const divdeposite = document.createElement("div");
    divdeposite.classList.add("mb-0");

    const spandeposite = document.createElement("span");
    spandeposite.classList.add("text-primary");
    spandeposite.textContent = "Since ";

    const depositeT = document.createElement("i");
    depositeT.classList.add("mdi");
    depositeT.classList.add("mdi-arrow-bottom-right");

    const spandeposite1 = document.createElement("span");
    spandeposite1.classList.add("text-muted");
    spandeposite1.textContent = timeT;
    divdeposite.appendChild(spandeposite);
    spandeposite.appendChild(depositeT);
    depositeT.appendChild(spandeposite1);

    document.getElementById("deposite").appendChild(divdeposite);

    //earnings

    const avaliableEarnings = document.createElement("h1");
    avaliableEarnings.classList.add("mt-1");
    avaliableEarnings.classList.add("mb-3");
    avaliableEarnings.textContent = "$" + (capital + dailyEarnings);
    document.getElementById("earnings").appendChild(avaliableEarnings);
    const divEarnings = document.createElement("div");
    divEarnings.classList.add("mb-0");

    const lineBreak4 = document.createElement("br");
    const spanEarnings = document.createElement("span");
    spanEarnings.classList.add("text-muted");
    spanEarnings.innerText = ` Capital: $${capital} `;
    spanEarnings.appendChild(lineBreak4);

    const spanEarnings2 = document.createElement("span");
    spanEarnings2.classList.add("text-success");
    spanEarnings2.innerText = ` Profit: +$${dailyEarnings}% `;

    const earningsT = document.createElement("i");
    earningsT.classList.add("mdi");
    earningsT.classList.add("mdi-arrow-bottom-right");

    const spanEarnings1 = document.createElement("span");
    spanEarnings1.classList.add("text-muted");
    divEarnings.appendChild(spanEarnings);
    spanEarnings.appendChild(earningsT);
    spanEarnings2.appendChild(earningsT);
    divEarnings.appendChild(spanEarnings1);
    divEarnings.appendChild(spanEarnings2);

    document.getElementById("earnings").appendChild(divEarnings);

    //transaction

    const completedTransactions = document.createElement("h1");
    completedTransactions.classList.add("mt-1");
    completedTransactions.classList.add("mb-3");
    const cancelledTransactions = document.createElement("h5");
    cancelledTransactions.classList.add("mt-1");
    cancelledTransactions.classList.add("mb-3");

    completedTransactions.textContent = "$" + deposite;

    document.getElementById("transaction").appendChild(completedTransactions);
    document.getElementById("transaction").appendChild(cancelledTransactions);

    const divTransaction = document.createElement("div");
    divTransaction.classList.add("mb-0");

    const spanTransaction = document.createElement("span");
    spanTransaction.classList.add("text-primary");
    spanTransaction.textContent = "Since ";

    const transaction = document.createElement("i");
    transaction.classList.add("mdi");
    transaction.classList.add("mdi-arrow-bottom-right");

    const spanTransaction1 = document.createElement("span");
    spanTransaction1.classList.add("text-muted");
    spanTransaction1.textContent = timeT;
    divTransaction.appendChild(spanTransaction);
    spanTransaction.appendChild(transaction);
    divTransaction.appendChild(spanTransaction1);

    document.getElementById("transaction").appendChild(divTransaction);

    if (activeplan == "None") {
      document.getElementById("stopinvestment").style.display = "none";
    }
    document
      .getElementById("stopinvestment")
      .addEventListener("click", async (e) => {
        e.preventDefault();
        try {
          console.log(email);
          const data = await axios.post("/apex/auth/generalupdates", {
            email: email,
            usdt: totalAvaliableBalance + capital + dailyEarnings,
            capital: 0,
            dailyEarnings: 0,
            activePlan: "None",
          });
          this.window.location = "./";
        } catch (error) {
          console.log(error);
        }
      });
  } catch (error) {
    localStorage.removeItem("token");
    console.log(error);
    console.log("Not Registred user. please register");
  }
});
