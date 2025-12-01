window.addEventListener("load", async () => {
  const clientEmail = localStorage.getItem("fetchClient");
  const data = await axios.post(
    "https://apex-h7wm.onrender.com/apex/auth/getallclients"
  );
  const totalClients = data.data.clients;
  console.log(totalClients);

  const client = totalClients.find((item) => item.email === clientEmail);
  console.log(client);

  const {
    name,
    email,
    _id,
    btc,
    usdt,
    eth,
    bnb,
    activePlan,
    balanceInc,
    totalWithdraw,
    dailyEarnings,
    wallet,
    capital,
    totaldeposite,
    totalBalance,
    withdrawableBalance,
    totalEarnings,
  } = client;
  document.getElementById("client_name").textContent = name;
  document.getElementById("client_email").textContent = email;

  document.getElementById("client_id").textContent = _id.slice(0, 8);
  document.getElementById("usdt").textContent = usdt;
  document.getElementById("total_balance").textContent = totalBalance;

  document.getElementById("capital").textContent = capital;
  document.getElementById("earning").textContent = dailyEarnings;
  document.getElementById("active_plan").textContent = activePlan;

  document.getElementById("total-withdrawal").textContent = balanceInc;

  document.getElementById("btc").textContent = btc;
  document.getElementById("eth").textContent = eth;
  document.getElementById("bnb").textContent = bnb;
  document.getElementById("withdrawalbalance").textContent =
    withdrawableBalance;
  document.getElementById("totalDeposite").textContent = totaldeposite;
  document.getElementById("totalEarnings").textContent = totalEarnings;
  document.getElementById("wallet").textContent = wallet;
  console.log(wallet);

  const newbtc = document.getElementById("newbtc");
  const newusdt = document.getElementById("newusdt");
  const neweth = document.getElementById("neweth");
  const newbnb = document.getElementById("newbnb");

  const newtotalBalance = document.getElementById("newtotal_balance");
  const newcapital = document.getElementById("newcapital");
  const newearning = document.getElementById("newearning");
  const investmentplan = document.getElementById("newplan");

  const newtotalDeposite = document.getElementById("newtotalDeposite");
  const newWithdrawableBalance = document.getElementById(
    "new_withdrawable_balance"
  );
  const newtotalEarnings = document.getElementById("newtotalEarnings");
  const newwallet = document.getElementById("newwallet");
  const newtotalwithdrawal = document.getElementById("newtotalwithdrawal");

  const topupbtn = document.querySelector("#topupbtn");
  topupbtn.style.display = "block";
  topupbtn.addEventListener("click", async (e) => {
    const _newbtc = Number(newbtc.value);
    const _newusdt = Number(newusdt.value);
    const _neweth = Number(neweth.value);
    const _newbnb = Number(newbnb.value);

    const _newtotalDeposite = Number(newtotalDeposite.value);
    const _newWithdrawableBalance = Number(newWithdrawableBalance.value);
    const _newtotalEarnings = Number(newtotalEarnings.value);
    const _newtotalwithdrawal = Number(newtotalwithdrawal.value);

    const _newtotalBalance = Number(newtotalBalance.value);
    const _newcapital = Number(newcapital.value);
    const _newearning = Number(newearning.value);
    const _newplan = investmentplan.value;
    const _newwallet = newwallet.value;

    try {
      await axios
        .post("https://apex-h7wm.onrender.com/apex/auth/generalupdates", {
          email: clientEmail,
          btc: _newbtc + btc,
          usdt: _newusdt + usdt,
          eth: _neweth + eth,
          bnb: _newbnb + bnb,
          dailyEarnings: _newearning + dailyEarnings,
          wallet: _newwallet,
          activePlan: _newplan,
          capital: _newcapital + capital,
          totalBalance: _newtotalBalance + totalBalance,
          balanceInc: _newtotalwithdrawal + balanceInc,
          withdrawableBalance: _newWithdrawableBalance + withdrawableBalance,
          totaldeposite: _newtotalDeposite + totaldeposite,
          totalEarnings: _newtotalEarnings + totalEarnings,
        })
        .then(() => {
          topupbtn.value = "Processing...";
          topupbtn.value = "Top-up Successful";
          setTimeout(() => {
            window.location = "../dashboard";
          }, 3000);
        });
      newbtc.value = "";
      newusdt.value = "";
      neweth.value = "";
      newbnb.value = "";
      newtotalDeposite.value = "";
      newWithdrawableBalance = "";
      newtotalEarnings.value = "";
    } catch (error) {
      console.log(error);
    }
  });
  //WITHDRAWAL
  const withdrawbtn = document.querySelector("#withdrawbtn");
  withdrawbtn.style.display = "block";
  withdrawbtn.addEventListener("click", async (e) => {
    const _newbtc = Number(newbtc.value);
    const _newusdt = Number(newusdt.value);
    const _neweth = Number(neweth.value);
    const _newbnb = Number(newbnb.value);
    const _newtotalDeposite = Number(newtotalDeposite.value);
    const _newWithdrawableBalance = Number(newWithdrawableBalance.value);
    const _newtotalEarnings = Number(newtotalEarnings.value);

    const _newtotalwithdrawal = Number(newtotalwithdrawal.value);

    const _newtotalBalance = Number(newtotalBalance.value);
    const _newcapital = Number(newcapital.value);
    const _newearning = Number(newearning.value);
    const _newplan = investmentplan.value;
    const _newwallet = newwallet.value;

    try {
      await axios
        .post("https://apex-h7wm.onrender.com/apex/auth/generalupdates", {
          email: clientEmail,
          btc: btc - _newbtc,
          usdt: usdt - _newusdt,
          eth: eth - _neweth,
          bnb: bnb - _newbnb,
          dailyEarnings: dailyEarnings - _newearning,
          wallet: _newwallet,
          activePlan: _newplan,
          capital: capital - _newcapital,
          totalBalance: totalBalance - _newtotalBalance,
          balanceInc: balanceInc - _newtotalwithdrawal,
          withdrawableBalance: withdrawableBalance - _newWithdrawableBalance,
          totaldeposite: totaldeposite - _newtotalDeposite,
          totalEarnings: totalEarnings - _newtotalEarnings,
        })
        .then(() => {
          withdrawbtn.value = "Processing...";
          withdrawbtn.value = "Withdrawal Successful";
          setTimeout(() => {
            window.location = "../dashboard";
          }, 3000);
        });
      newbtc.value = "";
      newusdt.value = "";
      neweth.value = "";
      newbnb.value = "";
      newtotalDeposite.value = "";
      newWithdrawableBalance = "";
      newtotalEarnings.value = "";
    } catch (error) {
      console.log(error);
    }
  });
});
