window.addEventListener("load", () =>{
    const setBtn = document.querySelector("#confirm")
    const amountIn = document.querySelector("#amount")
    const minimum = document.querySelector("#minimum")
    const ldata = localStorage.getItem("GetStartedAmount") 
    const alertt = document.querySelector("#alertsuccess")

    const lamount = ldata.split(",")[0]
    const lmax = ldata.split(",")[2]
    const plan = ldata.split(",")[1]

    minimum.textContent = `Minimum Amount: $${lamount}   - Maximum Amount $${lmax}`

    setBtn.addEventListener("click", (e) =>{
        e.preventDefault()

        const newamount = amountIn.value
        const newget = newamount + "," + plan
        console.log(newget)

        if(Number(newamount) < Number(lamount)){
            alertt.textContent = `Amount can not be less than $${lamount}`
        }
        else if(Number(newamount) > Number(lmax)){ 
            alertt.textContent = `Amount can not be more than $${lmax}`
        }
        else{
          localStorage.setItem("GetStartedAmount", newget)
          window.location = "../getstarted"
        }
    })
})