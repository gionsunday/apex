window.addEventListener('load', () => {
  const form = document.querySelector('#form');
  const trc20 = document.querySelector("#trc20")
  // form.addEventListener('submit', (n) =>{

  trc20.addEventListener('click', (e) => {
    e.preventDefault()
    var text = document.getElementById("copyText2");
    text.select();
    navigator.clipboard.writeText(text.value);

    var div = document.getElementById('small')
    var p = document.createElement('p');
    p.classList.add('badge');
    p.classList.add('bg-dark');
    p.innerText = "address copied to clipboard";
    div.appendChild(p)

    setTimeout(() => {
      div.style.display = 'none'
    }, 3000)
  })

})
// })

