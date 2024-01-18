
async function getAmount(clicker){
  const emailIn = document.getElementById('email')
  const asset = document.getElementById('asset')
  const amountt = document.getElementById("amount")

  asset.value = clicker.id
  console.log(clicker.textContent)
  console.log(asset.value)  
  // console.log(amount)
  // localStorage.setItem('amount', amount)
  

}

window.addEventListener('load', () =>{
  const topbtn = document.getElementById('topup')
  const debitbtn = document.getElementById('debit')
  const asset = document.getElementById('asset')
  const amountt = document.getElementById("amount")
  const emailIn = document.getElementById('email')

  topbtn.addEventListener('click', async () =>{
    const client = await axios.post('/apex/auth/getoneclient',{
      email:emailIn.value
    })
   const user = client.data.user

     if(asset.value == "USDT"){
       try {
       console.log(user.usdt)
          const data = await axios.post('/apex/auth/generalupdates', {
            email:emailIn.value,
            usdt: ( user.usdt + amountt.value)
          })
       document.getElementById("alertsuccess").textContent ="Deposit Successfull"
       window.location = '../dashboard'
       } catch (error) {
        console.log(error)
       }
     }

     else if(asset.value == "BTC"){
       try {
       console.log(user.btc)
          const data = await axios.post('/apex/auth/generalupdates', {
            email:emailIn.value,
            btc: ( user.btc + amountt.value)
          })
          document.getElementById("alertsuccess").textContent ="Deposit Successfull"
          window.location = '../dashboard'
       } catch (error) {
        console.log(error)
       }
     }

     else if(asset.value == "BNB"){
       try {
       console.log(user.bnb)
          const data = await axios.post('/apex/auth/generalupdates', {
            email:emailIn.value,
            bnb: ( user.bnb + amountt.value)
          })
          document.getElementById("alertsuccess").textContent ="Deposit Successfull"
          window.location = '../dashboard'
       } catch (error) {
        console.log(error)
       }
     }

     else if(asset.value == "ETH"){
       try {
       console.log(user.eth)
          const data = await axios.post('/apex/auth/generalupdates', {
            email:emailIn.value,
            eth: ( user.eth + amountt.value)
          })
          document.getElementById("alertsuccess").textContent ="Deposit Successfull"
          window.location = '../dashboard'
       } catch (error) {
        console.log(error)
       }
     }
     else {
      document.getElementById("alertsuccess").textContent ="Abeg Select Asset!"
       
     }
  })







  debitbtn.addEventListener('click', async () =>{
    const client = await axios.post('/apex/auth/getoneclient',{
      email:emailIn.value
    })
   const user = client.data.user

     if(asset.value == "USDT"){
       try {
       console.log(user.usdt)
          const data = await axios.post('/apex/auth/generalupdates', {
            email:emailIn.value,
            usdt: ( user.usdt - amountt.value)
          })
       document.getElementById("alertsuccess").textContent ="Deposit Successfull"
       window.location = '../dashboard'
       } catch (error) {
        console.log(error)
       }
     }

     else if(asset.value == "BTC"){
       try {
       console.log(user.btc)
          const data = await axios.post('/apex/auth/generalupdates', {
            email:emailIn.value,
            btc: ( user.btc - amountt.value)
          })
          document.getElementById("alertsuccess").textContent ="Deposit Successfull"
          window.location = '../dashboard'
       } catch (error) {
        console.log(error)
       }
     }

     else if(asset.value == "BNB"){
       try {
       console.log(user.bnb)
          const data = await axios.post('/apex/auth/generalupdates', {
            email:emailIn.value,
            bnb: ( user.bnb - amountt.value)
          })
          document.getElementById("alertsuccess").textContent ="Deposit Successfull"
          window.location = '../dashboard'
       } catch (error) {
        console.log(error)
       }
     }

     else if(asset.value == "ETH"){
       try {
       console.log(user.eth)
          const data = await axios.post('/apex/auth/generalupdates', {
            email:emailIn.value,
            eth: ( user.eth - amountt.value)
          })
          document.getElementById("alertsuccess").textContent ="Deposit Successfull"
          window.location = '../dashboard'
       } catch (error) {
        console.log(error)
       }
     }
     else {
      document.getElementById("alertsuccess").textContent ="Abeg Select Asset!"
       
     }
  })
})