window.addEventListener('load', () =>{
    const deletebtn = document.querySelector('#delete')
    const email = document.getElementById("delete_client_email")
      const client_email = localStorage.getItem('fetchClient')

      document.getElementById("client_email").textContent = client_email

      deletebtn.addEventListener('click', async ()=>{
        const _email = email.value
        try{
          await axios.post('/cobratate/auth/deleteclient', {
            email:_email
          }).then(() =>{
            deletebtn.value = "Deleting..."
            deletebtn.value = "Deleted"
            setTimeout(() =>{
             window.location = 'dashboard.html'
            },3000)
          })

        }catch(error){
          console.log(error)
        }

      })
      

     
      
  })
  