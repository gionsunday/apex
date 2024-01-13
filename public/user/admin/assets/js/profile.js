window.addEventListener('load', ()=>{
    const name = document.querySelector('#profilename')
    const email = document.querySelector('#profileemail')
    const acctount = document.querySelector('#profileaccount')

    const profileDetails = localStorage.getItem('LogprofileDetails')
    const profileName = profileDetails.split(',')[0]
    const profileEmail = profileDetails.split(',')[1]
    const profileAccount = profileDetails.split(',')[2]

    name.textContent = profileName || 'You'
    email.textContent = profileEmail || 'Your Email'
    acctount.textContent = `$${profileAccount}` || 0

})