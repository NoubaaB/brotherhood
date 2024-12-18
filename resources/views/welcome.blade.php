<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <!-- <link rel="icon" type="image/gif" href="/storage/atom.gif"> -->
    <link rel="icon" type="image/png" href="{{asset('/storage/icons/icon-144x144.png')}}" sizes="144x144" async defer>
    <link rel="manifest" href="{{asset('/manifest.json')}}">
    <link rel="apple-touch-icon" href="{{asset('/storage/icons/icon-144x144.png')}}" sizes="144x144">
    <meta name="theme-color" content="#fff" />
    <meta name="background_color" content="#fff" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{config('app.name')}} App</title>
    <meta name=" description" content="Brotherhood App">
    <meta name="keywords" content="Brotherhood App">
    <meta property="og:title" content="Brotherhood App" />
    <meta property="og:url" content="https://broterhood.congelationvillamar.com/" />
    <meta property="og:description" content="Brotherhood App" />
    <meta property="og:image" content="{{asset('/storage/icons/icon-144x144.png')}}" />
    <meta property="og:type" content="website" />
    @vite(['resources/css/app.css'])

</head>

<body>
    <div id="app"></div>
    @vite(['resources/js/app.js'])
    <script>
        // Register the Service Worker 
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(function(registration) {
                    console.log('Service Worker registered with scope:', registration.scope);
                }).catch(function(error) {
                    console.log('Service Worker registration failed:', error);
                });
        }
    </script>
</body>

</html>