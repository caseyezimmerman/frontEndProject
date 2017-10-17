$(document).ready(function() {
    // var mapURL = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA9O_Kfl3FvK2OwNOA8qrLKpJ7wVTycGms`
    var mapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
    var map;
    var x = $.ajax({
        type: 'GET',
        url: mapURL,
        dataType: 'jsonp',
        jsonpCallback: 'initMap',
        async: false, // this is by default false, so not need to mention
        crossDomain: true // tell the browser to allow cross domain calls.
    });
    console.log(x)
    console.log(mapURL)

    // ***Marker***

    // ***Get Location***

});

function initMap() {
    var uluru = {
        lat: 33.9304,
        lng: -84.3733
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: uluru
    });
    console.log(map)
    var marker = new google.maps.Marker({
        position: uluru,
        map: map


    });
}

// $(window).bind('scroll', function() {
//     if ($(window).scrollTop() > 600) {
//         $('#first').fadeOut();
//         } else if ($(window.scrollTop() < 500)) {
//         $('#first').fadeIn();
//     }
// });

setTimeout(function() {
    $("#myModal").modal('show')
}, 1000)