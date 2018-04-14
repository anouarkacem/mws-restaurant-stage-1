'use strict';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((registration) => {
            console.log('Service Worker has been registered succesfully', registration.scope);
        }, error => {
            console.log('Registration failed', error)
        });
    })
}