window.addEventListener('load', () =>{
    const input = document.querySelector('#amount')
      const amount = localStorage.getItem('amount')
      if(!amount){
        alert('Please fill in the Amount!')
        window.location= '#'
      }
      input.textContent = amount || 0

     
      
  })
  