function logOut(){
    localStorage.removeItem('dashboard')
    alert('You have been logged out!')
    window.location = "index.html"
}
