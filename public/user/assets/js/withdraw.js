function withdrawll(){
    const wallet = document.getElementById('wallet')
    const amount = document.getElementById('amount')
    const wDetails = []
  
    

    const ammountA = amount.value 
    const walletA = wallet.value || "Your Wallet"

    wDetails.push(ammountA, walletA)

    localStorage.setItem('withdraw', wDetails)

    console.log(ammountA, walletA)



}