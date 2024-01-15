window.addEventListener('load', () => {
    const data = localStorage.getItem('DATA')
    const actualRegBtn  = document.querySelector('#acregbtn')
    const inCode = document.querySelector('#code')
    
    var codeAlert = document.querySelector('#codeerror')
    codeAlert.style.display ="none"
    const bCode = localStorage.getItem('code')
    
    const name = data.split(',')[0]
    const email = data.split(',')[1]
    const password = data.split(',')[2]

    actualRegBtn.addEventListener('click', async () =>{
        const code = inCode.value
        
  const today = new Date();
  const date = (today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()).toString()
        console.log(code, bCode,name, email, password)
        if(bCode === code){

      
            try {
                const {data} = await axios.post('https://apex-h7wm.onrender.com/apex/auth/register/accountactivation', {
                 name:name, email:email,password:password, regTime:date })

                 window.location ="../redirect"
                
        } catch (error) {
            console.log('Something went wrong try again!')
        }
        }
        else{
            codeAlert.style.display ="block"
        }
    })

})