//functions & info required for components
export const loadingImg = "assets/loading.gif"

export function createNotification(title, message) {
    const options = {
        type: 'basic',
        iconUrl: 'assets/youtube.png',
        title: title,
        message: message,
    };

    chrome.notifications.create('', options, function (notificationId) {
        console.log('Notification created with ID:', notificationId);
    });
}


//used to fetch components from server
function fetchNotifications() {
    fetch('http://localhost:8000/notifications')
        .then(response => response.json())
        .then(data => {
            data.map(notification => {
                createNotification(notification.title, notification.description);

            })
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// Call the fetchData function every 1 second
setInterval(fetchNotifications, 1000);