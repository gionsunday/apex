
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
  const deletebtn = document.getElementById('delete')
  // const debitbtn = document.getElementById('debit')
  // const asset = document.getElementById('asset')
  const amountt = document.getElementById("amount")
  const emailIn = document.getElementById('email')

  deletebtn.addEventListener('click', async () =>{
//     const client = await axios.post('https://apex-h7wm.onrender.com/apex/auth/getoneclient',{
//       email:emailIn.value
//     })
//    const user = client.data.user[0]
// // console.log(user)
       try {
      
          const data = await axios.post('https://apex-h7wm.onrender.com/apex/auth/deleteoneclient', {
            email:emailIn.value,
            blocked: "true"
          })
       document.getElementById("alertsuccess").textContent ="User Blocked"
       window.location = '../dashboard'
       } catch (error) {
        console.log(error)
       }
    
  })





})