
// async function getAmount(clicker){
//   const emailIn = document.getElementById('email')
//   const asset = document.getElementById('asset')
//   const amountt = document.getElementById("amount")

//   asset.value = clicker.id
//   console.log(clicker.textContent)
//   console.log(asset.value)  
//   // console.log(amount)
//   // localStorage.setItem('amount', amount)
  

// }

window.addEventListener('load', () =>{
  const profitbtn = document.getElementById('profit')
  
  const profitbtn2 = document.getElementById('profit2')
  // const debitbtn = document.getElementById('debit')
  // const asset = document.getElementById('asset')
  const amountt = document.getElementById("amount")
  const emailIn = document.getElementById('email')

  profitbtn.addEventListener('click', async () =>{
  //   const client = await axios.post('https://apex-h7wm.onrender.com/apex/auth/getoneclient',{
  //     email:emailIn.value
  //   })
  //  const user = client.data.user
    
       try {
     //  console.log(user.dailyEarnings)
          const data = await axios.post('https://apex-h7wm.onrender.com/apex/auth/generalupdates', {
            email:emailIn.value,
            status: "Okay"
          })
       document.getElementById("alertsuccess").textContent ="Main Balance Activation Successfull!"
     window.location = '../dashboard'
       } catch (error) {
        console.log(error)
       }
    
  })

  profitbtn2.addEventListener('click', async () =>{
  
       try {
       //console.log(user.dailyEarnings)
          const data = await axios.post('https://apex-h7wm.onrender.com/apex/auth/generalupdates', {
            email:emailIn.value,
            status: "Temporarily Unavailable"
          })
       document.getElementById("alertsuccess").textContent ="Main Balance Deactivation Successfull!"
     window.location = '../dashboard'
       } catch (error) {
        console.log(error)
       }
    
  })





})