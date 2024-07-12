window.addEventListener('load', () =>{
    const transaction = localStorage.getItem('transaction')
  
   

    const walletaddress = transaction.split(',')[5] 
    document.querySelector('#wallet').textContent = walletaddress || "Apex Corporates Wallet"

    const amount = transaction.split(',')[2] 
    const asset = transaction.split(',')[1] 
    const totalAmount = `${amount}${asset}`
    document.querySelector('#amount').textContent = totalAmount || 0
    
    const status =  transaction.split(',')[3] 
    document.getElementById('status').textContent = status || 'pending'
   
    const  typeT =  transaction.split(',')[0] 
    document.querySelector('#type').textContent = typeT
    const  transId =  transaction.split(',')[4] 
    document.querySelector('#id').textContent = transId || ' '
    const  timeT =  transaction.split(',')[6] 
    document.querySelector('#time').textContent = timeT
 
 console.log(transId, timeT)

})