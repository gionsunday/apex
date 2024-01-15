window.addEventListener('load', async ()  => {
  const dashboard = localStorage.getItem('dashboard')
  const userId = dashboard.split(',')[4]
  console.log(userId)
  const myTransactions = await axios.get(`https://apex-h7wm.onrender.com/apex/newtransaction/${userId}`)
  const transactions = myTransactions.data.newtransactions
  if(transactions.length >= 5){
    const length = transactions.length
    const newtransactions = transactions.slice(-5)

  
  if(newtransactions.length !== 0){
  transactions.forEach(transaction => {
    const {_id, transactionType, asset, amount, status, walletAddress, updatedAt} = transaction

    const totalAmount = `${amount}${asset}`
    

    const tbody = document.createElement('tbody')

    const tr = document.createElement('tr')
  
    const td1 = document.createElement('td')
    td1.textContent = transactionType

    const td2 = document.createElement('td')
    td2.classList.add('d-none')
    td2.classList.add('d-xl-table-cell')
    td2.textContent = updatedAt.split('T')[0] +' '+ updatedAt.split('T')[1].split('.')[0]

    const td3 = document.createElement('td')
    td3.classList.add('badge')
    td3.classList.add('m-2')
    td3.textContent = status
    if(status.toLowerCase() === 'processing'){
      
      td3.classList.add('bg-warning')
      }
      else if(status.toLowerCase() === 'cancelled'){
  
        td3.classList.add('bg-danger')
      }
      else{
  
        td3.classList.add('bg-success')
      }
    

    const td4 = document.createElement('td')
    
    td4.textContent = totalAmount

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tbody.appendChild(tr)

    document.getElementById('table').appendChild(tbody)





  
  });
}else{
  
  const tbody = document.createElement('tbody')

  const tr = document.createElement('tr')

  const td1 = document.createElement('td')
  td1.textContent = "none"

  const td2 = document.createElement('td')
  td2.classList.add('d-none')
  td2.classList.add('d-xl-table-cell')
  td2.textContent = "none"

  const td3 = document.createElement('td')
  td3.textContent = "none"

  const td4 = document.createElement('td')
  td4.classList.add('d-none')
  td4.classList.add('d-md-table-cell')
  td4.textContent = "none"

  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)
  tr.appendChild(td4)
  tbody.appendChild(tr)

  document.getElementById('table').appendChild(tbody)

}

  }
  else{


  if(transactions.length !== 0){
  transactions.forEach(transaction => {
    const {_id, transactionType, asset, amount, status, walletAddress, updatedAt} = transaction

    const totalAmount = `${amount}${asset}`
    

    const tbody = document.createElement('tbody')

    const tr = document.createElement('tr')
  
    const td1 = document.createElement('td')
    td1.textContent = transactionType

    const td2 = document.createElement('td')
    td2.classList.add('d-none')
    td2.classList.add('d-xl-table-cell')
    td2.textContent = updatedAt.split('T')[0] +' '+ updatedAt.split('T')[1].split('.')[0]

    const td3 = document.createElement('td')
    td3.classList.add('badge')
    td3.classList.add('m-2')
    td3.textContent = status
    if(status.toLowerCase() === 'processing'){
      
      td3.classList.add('bg-warning')
      }
      else if(status.toLowerCase() === 'cancelled'){
  
        td3.classList.add('bg-danger')
      }
      else{
  
        td3.classList.add('bg-success')
      }
    

    const td4 = document.createElement('td')
    td4.classList.add('d-none')
    td4.classList.add('d-md-table-cell')
    td4.textContent = totalAmount

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tbody.appendChild(tr)

    document.getElementById('table').appendChild(tbody)





  
  });
}else{
  
  const tbody = document.createElement('tbody')

  const tr = document.createElement('tr')

  const td1 = document.createElement('td')
  td1.textContent = "none"

  const td2 = document.createElement('td')
  td2.classList.add('d-none')
  td2.classList.add('d-xl-table-cell')
  td2.textContent = "none"

  const td3 = document.createElement('td')
  td3.textContent = "none"

  const td4 = document.createElement('td')
  td4.classList.add('d-none')
  td4.classList.add('d-md-table-cell')
  td4.textContent = "none"

  tr.appendChild(td1)
  tr.appendChild(td2)
  tr.appendChild(td3)
  tr.appendChild(td4)
  tbody.appendChild(tr)

  document.getElementById('table').appendChild(tbody)
  }
  }

})
