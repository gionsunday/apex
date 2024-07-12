function getstartedAmount(invest) {
    const getstartedAmount = invest.id
    console.log(getstartedAmount)
    localStorage.setItem("GetStartedAmount", getstartedAmount)
    localStorage.setItem("StartedAmount", getstartedAmount)
}