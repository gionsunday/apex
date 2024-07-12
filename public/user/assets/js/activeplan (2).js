window.addEventListener("load", () =>{
    const activeplans = localStorage.getItem('activeplans').split(',')
    const status = localStorage.getItem('status')
    const wallet = localStorage.getItem('wallet')
 
    // document.getElementById('wallet').textContent = wallet
    // document.getElementById('status').textContent = status

    activeplans.map((plan)=>{
        const li = document.createElement('li')
        li.classList.add('badge')
        li.textContent = plan ||'None'
        li.classList.add('p-2')
        if(plan.toLowerCase() === "basic"){
          li.classList.add('bg-primary')
        }
        else if(plan.toLowerCase === "golden"){
          li.classList.add('bg-warning')
        }
        else{
          li.classList.add('bg-secondary')
        }
    
        document.getElementById('activeplans').appendChild(li)
    
      })
})