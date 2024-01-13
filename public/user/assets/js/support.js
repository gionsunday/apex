

window.addEventListener('load', async () =>{

    const email = document.querySelector('#email')
    const nmessage = document.querySelector('#message')
    const sendbtn = document.querySelector("#sendbtn")

    sendbtn.addEventListener('click', async (e) =>{
        try {
            const data = await axios.post('/apex/newtransaction/createsupport',{
                email:email.value,
                message:nmessage.value
            })
            sendbtn.value = "Message Sent!"
            nmessage.value =""
            email.value=""
            window.location = '../dashboard'
    
        } catch (error) {
            console.log(error)
            
        }
    })

   
})