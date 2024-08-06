import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
window.axios = axios;
window.moment = moment;
window._ = _;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Subscribe Users to Push Notifications
Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
        // get service worker
        if (localStorage.getItem("web_push") == null) {
            navigator.serviceWorker.ready.then((sw) => {
                // subscribe
                sw.pushManager.subscribe({
                    userVisibleOnly: true,
                    // applicationServerKey: import.meta.env.VAPID_PUBLIC_KEY,
                    applicationServerKey: import.meta.env.VITE_WEB_PUSH_PUBLIC_KEY,
                }).then((subscription) => {
                    console.log(JSON.stringify(subscription));
                    localStorage.setItem("web_push", JSON.stringify(subscription))
                    saveSub(JSON.stringify(subscription));
                });
            });
        }
    }
});

function saveSub(sub) {
    axios.post("/api/save-push-notification-sub", {
        'sub': sub
    })
}
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allow your team to quickly build robust real-time web applications.
 */