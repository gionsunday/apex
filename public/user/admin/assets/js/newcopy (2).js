window.addEventListener('load', () => {
    const form = document.querySelector('#form');
    const erc20 = document.querySelector("#erc20")

erc20.addEventListener('click', (n) => {
    n.preventDefault()
    var text = document.getElementById("copyText");
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
