window.addEventListener('load', () =>{
    const email = localStorage.getItem('DATA').split(',')[1]
    console.log(email)
    const verifyEmail = document.querySelector('#verificationemail')
    verifyEmail.textContent = email || 'Your email'
    
})