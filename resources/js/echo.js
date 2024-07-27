import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
export function initSocket() {
    window.Pusher = Pusher;
    console.log("localStorage.getItem('token')", localStorage.getItem('token'))
    window.Echo = new Echo({
        broadcaster: 'reverb',
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
        wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
        forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
        auth: {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        },
        enabledTransports: ['ws', 'wss'],
    });
}