
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
  // const debitbtn = document.getElementById('debit')
  // const asset = document.getElementById('asset')
  const amountt = document.getElementById("amount")
  const emailIn = document.getElementById('email')

  profitbtn.addEventListener('click', async () =>{
    const client = await axios.post('https://apex-h7wm.onrender.com/apex/auth/getoneclient',{
      email:emailIn.value
    })
   const user = client.data.user
    const Newnumbe = Number(amountt.value)
    console.log(Newnumbe)
       try {
       console.log(user.dailyEarnings)
          const data = await axios.post('https://apex-h7wm.onrender.com/apex/auth/generalupdates', {
            email:emailIn.value,
            dailyEarnings: ( user.dailyEarnings + Newnumbe)
          })
       document.getElementById("alertsuccess").textContent ="Profit Top-up Successfull"
     window.location = '../dashboard'
       } catch (error) {
        console.log(error)
       }
    
  })





})