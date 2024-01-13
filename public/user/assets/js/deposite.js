
function getAmount(){
  const input = document.getElementById('amount')
  const amountt = localStorage.getItem("amount")
  const amount = input.value
  
    
  console.log(amount)
  localStorage.setItem('amount', amount)
  
    
  

  

}
