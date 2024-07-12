const userDataRef = []
const newUserData =  localStorage.getItem('dashboard')
window.addEventListener ('load', () => {
const form = document.querySelector('#form');
const loginEmail = document.querySelector('#email');
const loginPassword = document.querySelector('#password');
const loginBtn = document.querySelector('#loginbtn');


const newUsertoken= newUserData.split(',')[0]
const newUserEmail = newUserData.split(',')[3]
const newUserName = newUserData.split(',')[1]
console.log(newUserEmail,newUserName, newUsertoken)

form.addEventListener('submit', (e) => {
    e.preventDefault();

    loginBtn.addEventListener('click', async function(){
    
     const email= loginEmail.value
     const password = loginPassword.value
     const token =  newUsertoken
     if(!token){
     console.log('no token')
     }
     try {
       const data = await axios.post('https://apex-h7wm.onrender.com/apex/auth/login', {
         email, password,
         Headers:{
          Authorization:  `Bearer ${token}`,
        },
         
       })
       
       userDataRef.push(email, password)
       if(!data){
         console.log('Wrong email or password')
       }
       
     
       localStorage.setItem('userDataLog', userDataRef)
       window.location = '../dashboard'
       
     } catch (error) {
       localStorage.removeItem('token')
       console.log('Not Registred user')
       document.getElementById('alert').textContent = 'Wrong Value Entered for Email or Password'
     }
   
    

})
})
})
