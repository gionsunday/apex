window.addEventListener('load', ()=>{
    const transaction = []
    const dashboard = localStorage.getItem('dashboard')
    const details = localStorage.getItem('withdraw')
    const withdrawBtn = document.querySelector('#withdrawbtn')
    const asset = document.querySelector('#asset').value
    const email = localStorage.getItem("LogprofileDetails").split(',')[1]
    
    const userId = dashboard.split(',')[4]
    const amountAct = details.split(',')[0]
    const walletAct = details.split(',')[1]

    withdrawBtn.addEventListener('click', async () =>{
       
            
    try {
        const data = await axios.post('https://apex-h7wm.onrender.com/apex/newtransaction', {
            transactionType:"Withdrawal", 
            email:email,
            amount:amountAct, asset:asset, 
            createdBy: userId, 
            walletAddress:walletAct })
          const typeT = data.data.newtransaction.transactionType
           const  assetT = data.data.newtransaction.asset
           const amount = data.data.newtransaction.amount
           const status=data.data.newtransaction.status
           const transId = data.data.newtransaction._id
            const transwallet = data.data.newtransaction.walletAddress
           const time = data.data.newtransaction.createdAt
          transaction.push(typeT,assetT,amount,status,transId,transwallet,time)

          localStorage.setItem("transaction", transaction)
         
            window.location = "../prehistory"
        } catch (error) {
            console.log(error)
            document.getElementById("error").textContent = 'Can not complete transaction at the moment, try again later'
            console.log('Can not complete transaction at the moment, try again later')
        }
    })
})