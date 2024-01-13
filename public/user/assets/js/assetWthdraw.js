window.addEventListener('load', () => {
    const details = localStorage.getItem('withdraw')
    const wallet = document.querySelector('#wwallet')
    const amount = document.querySelector('#wamount')
  

    const amountAct = details.split(',')[0]
    const walletAct = details.split(',')[1]

    wallet.value = walletAct
    amount.value = amountAct

    
})

