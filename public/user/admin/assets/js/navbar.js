window.addEventListener('load', () =>{
    const name = localStorage.getItem('LogprofileDetails').split(',')[0]
    document.querySelector('#name').textContent = name || You
})