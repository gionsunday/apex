window.addEventListener('load',() =>{
const notificate = localStorage.getItem('Notifications')

const notifications = notificate.split('.,')
const notificateLength = notifications.length
document.getElementById('indicator').textContent= notificateLength
notifications.forEach(notification => {
    const div = document.createElement('div')
    div.classList.add('text-muted')
    div.textContent = notification
    const divDird = document.createElement('div')
    divDird.classList.add('dropdown-divider')
    div.appendChild(divDird)

    document.getElementById('notifications').textContent = `${notificateLength} New Notification`

    document.getElementById('appenddiv').appendChild(div)
    
    
});

})