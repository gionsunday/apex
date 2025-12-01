$(document).ready(async () => {
  try {
    const allClients = await axios.post(
      "https://apex-h7wm.onrender.com/apex/auth/getallclients"
    );
    // console.log(allClients.data.clients)

    allClients.data.clients.forEach((client) => {
      const didiv = $(`<div>
          <div class="col-12">
							<div class="card">
								<form>
									<div class="card-header" style="text-align:center">
										<h5 class="card-title mb-0">User Details<span style="margin-left:15px; padding:5px;  color:#e8e8e8; border:1px #fff solid; box-shadow:0px 0px 1px rgba(0, 0, 0, 0.24) ">Account Blocked: ${client.blocked} </span></h5>
                                        </div>

                                        <div class="card-body">
										<input type="button" id="wwallet"
											style="display:flex; color: #e8e8e8; box-shadow:0px 0px 1px rgba(0, 0, 0, 0.24);padding:5px;background-color:rgba(0, 0, 0, 0.11);border:none;width:100%;border-radius:.2rem;flex: 1 1 0%;"
											value='Name:  ${client.name}' />
										<div class="dropdown-divider"></div>
										<input type="button" id="asset" value="Email: ${client.email}"
											style="display:flex; color: #e8e8e8; box-shadow:0px 0px 1px rgba(0, 0, 0, 0.24);padding:5px;background-color:rgba(0, 0, 0, 0.11);border:none;width:100%;border-radius:.2rem;flex: 1 1 0%;"
											 />
										<div class="dropdown-divider"></div>
										<input type="button" id="wamount"
											style="display:flex; color: #e8e8e8; box-shadow:0px 0px 1px rgba(0, 0, 0, 0.24);padding:5px;background-color:rgba(0, 0, 0, 0.11);border:none;width:100%;border-radius:.2rem;flex: 1 1 0%;"
											placeholder="amount" value="Current Investment Plan: ${client.activePlan}" />
                                            
                                            <div class="dropdown-divider"></div>
                                            <input type="button" id="wamount"
											style="display:flex; color: #e8e8e8; box-shadow:0px 0px 1px rgba(0, 0, 0, 0.24);padding:5px;background-color:rgba(0, 0, 0, 0.11);border:none;width:100%;border-radius:.2rem;flex: 1 1 0%;"
											placeholder="amount" value="Capital: ${client.capital}" />
                                            
                                            <div class="dropdown-divider"></div>
                                            <input type="button" id="wamount"
											style="display:flex; color: #e8e8e8; box-shadow:0px 0px 1px rgba(0, 0, 0, 0.24);padding:5px;background-color:rgba(0, 0, 0, 0.11);border:none;width:100%;border-radius:.2rem;flex: 1 1 0%;"
											placeholder="amount" value="Daily Earning: ${client.dailyEarnings}" />
                                            
                                            <div class="dropdown-divider"></div>
                                            <input type="button" id="wamount"
											style="display:flex; color: #e8e8e8; box-shadow:0px 0px 1px rgba(0, 0, 0, 0.24);padding:5px;background-color:rgba(0, 0, 0, 0.11);border:none;width:100%;border-radius:.2rem;flex: 1 1 0%;"
											placeholder="amount" value="Total Balance: ${client.totalBalance}" />
                                            
                                            <div class="dropdown-divider"></div>
                                            <input type="button" id="wamount"
											style="display:flex; color: #e8e8e8; box-shadow:0px 0px 1px rgba(0, 0, 0, 0.24);padding:5px;background-color:rgba(0, 0, 0, 0.11);border:none;width:100%;border-radius:.2rem;flex: 1 1 0%;"
											placeholder="amount" value="Total Deposit: ${client.totaldeposite}" />
                                            
                                            <div class="dropdown-divider"></div>
                                            <input type="button" id="wamount"
											style="display:flex; color: #e8e8e8; box-shadow:0px 0px 1px rgba(0, 0, 0, 0.24);padding:5px;background-color:rgba(0, 0, 0, 0.11);border:none;width:100%;border-radius:.2rem;flex: 1 1 0%;"
											placeholder="amount" value="Total USDT Balance: ${client.usdt}USDT" />
                                           
                                            <div class="dropdown-divider"></div>
                                            <input type="button" id="wamount"
											style="display:flex; color: #e8e8e8; box-shadow:0px 0px 1px rgba(0, 0, 0, 0.24);padding:5px;background-color:rgba(0, 0, 0, 0.11);border:none;width:100%;border-radius:.2rem;flex: 1 1 0%;"
											placeholder="amount" value="Total ETH Balance: ${client.eth}ETH" />
                                            
                                            <div class="dropdown-divider"></div>
                                            <input type="button" id="wamount"
											style="display:flex; color: #e8e8e8; box-shadow:0px 0px 1px rgba(0, 0, 0, 0.24);padding:5px;background-color:rgba(0, 0, 0, 0.11);border:none;width:100%;border-radius:.2rem;flex: 1 1 0%;"
											placeholder="amount" value="Total BTC Balance: ${client.btc}BTC" />
                                            
                                            <div class="dropdown-divider"></div>
                                            <input type="button" id="wamount"
											style="display:flex; color: #e8e8e8; box-shadow:0px 0px 1px rgba(0, 0, 0, 0.24);padding:5px;background-color:rgba(0, 0, 0, 0.11);border:none;width:100%;border-radius:.2rem;flex: 1 1 0%;"
											placeholder="amount" value="Total BNB Balance: ${client.bnb}BNB" />
									

                                       
									
										

										
									</div>
									<small id="error" style="text-align: center; font-size: 16px; color: rgb(220, 20, 177);"></small>
								</form>

							</div>
						</div>
          </div>`);

      $("#holdc").append(didiv);
    });
  } catch (error) {
    console.log(error);
  }

  $(".card").mouseenter(() => {
    console.log($("#asset").val());
  });
});
