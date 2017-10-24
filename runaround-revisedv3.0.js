// GLOBAL Vars/stuff
var mapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
var ajaxRequest = $.ajax({
    type: 'GET',
    url: mapURL,
    dataType: 'jsonp',
    jsonpCallback: 'initMap',
    async: false, // this is by default false, so not need to mention
    crossDomain: true // tell the browser to allow cross domain calls.
});
var userLocation;
var userLocationLatLng;
var init_lat; // set to userLocation.lat
var init_lng; // set to userLocation.lng
var range; // used to increase radius/length of path
var geocoder; // turns userLocation string to usable coordination object
var marker;
var map;
var directionsService;
var directionsDisplay;
var stepDisplay;
var markerArray = [];
var lat_lng; // used for extra
var latArray = [];
var lngArray = [];
$(document).ready(function() {
    $('.run-form').submit(function(event) {
        event.preventDefault();
        reset()
        $("#instructions").show()
        userLocation = document.getElementById("location").value;
        // 32 - 33 for grabbing drop down menu value as a string
        var indexValue = document.getElementById("miles").selectedIndex;
        var distance = document.getElementsByTagName("option")[indexValue].innerHTML;
        if (distance == "1-3 miles") {
            range = .011
        } else if (distance == "3-5 miles") {
            range = .013
        } else if (distance == "5-7 miles") {
            range = .015
        } else if (distance == "7-10 miles") {
            range = .017
        }
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': userLocation }, function(results, status) {
            if (status === 'OK') {
                userLocationLatLng = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                }
                initMap(userLocationLatLng) // places map where user submit value
                findCoordinates(init_lat, init_lng, range); // generates 6 different coords for route
                calculateAndDislayRoute( // connects the route 
                    directionsDisplay, directionsService, markerArray, stepDisplay, map, userLocation);
            }
        })
    });
});

function initMap(coordLocation = { // hard coded location upon page location
    lat: 33.989073,
    lng: -84.507361
}) {
    initialize(coordLocation)
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: coordLocation
    });
    marker = new google.maps.Marker({
        position: coordLocation,
        map: map
    });
    directionsService = new google.maps.DirectionsService; // calculates directions
    directionsDisplay = new google.maps.DirectionsRenderer({ map: map }); // renders the directions to be display
    directionsDisplay.setPanel(document.getElementById('instructions')); // sets the html
    stepDisplay = new google.maps.InfoWindow; // live updates userLocation
}

function initialize(userLocation) { // places first marker
    markerArray = [] // empty the array
    init_lat = userLocation.lat
    init_lng = userLocation.lng
    var init_lat_lng = new google.maps.LatLng(init_lat, init_lng);
    markerArray.push(marker);
    latArray.push(init_lat_lng.lat()) /////push lat of our initial point
    lngArray.push(init_lat_lng.lng()) /////push lng of our initial point
}

function findCoordinates(lat, lng, range) { // uses triangles to find extra points
    var numOfPoints = 6;
    var degreesPerPoint = -5 / numOfPoints;
    var x2;
    var y2;
    var currentAngle = 45; // changes where points are placed
    for (let i = 0; i <= numOfPoints; i++) {
        x2 = Math.cos(currentAngle) * range; // range increases radius
        y2 = Math.sin(currentAngle) * range;
        newLat = lat + x2;
        newLng = lng + y2;
        lat_lng = new google.maps.LatLng(newLat, newLng);
        marker = new google.maps.Marker({
            position: lat_lng,
            map: map,
        });
        latArray.push(lat_lng.lat()); ////push lats of points we just looped through and placed on map
        lngArray.push(lat_lng.lng());
        markerArray.push(marker);
        currentAngle += degreesPerPoint;
    }
};

function calculateAndDislayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map, userLocation) {
    for (let i = 0; i < markerArray.length; i++) {
        markerArray[i].setMap(null);
    }
    var origin = userLocationLatLng
    var waypoints = [{ // creates object for points generated with findCoordinates
            location: {
                lat: latArray[1],
                lng: lngArray[1]
            }
        },
        {
            location: {
                lat: latArray[2],
                lng: lngArray[2]
            }
        },
        {
            location: {
                lat: latArray[3],
                lng: lngArray[3]
            }
        },
        {
            location: {
                lat: latArray[4],
                lng: lngArray[4]
            }
        },
        {
            location: {
                lat: latArray[5],
                lng: lngArray[5]
            }
        },
        {
            location: {
                lat: latArray[6],
                lng: lngArray[6]
            }
        }
    ]
    directionsService.route({
        origin: origin,
        destination: origin,
        waypoints: waypoints,
        travelMode: "WALKING", // places path on viable/safe walking paths 
        optimizeWaypoints: true,
        provideRouteAlternatives: true,
        avoidFerries: true,
        avoidHighways: true,
    }, (response, status) => {
        if (status === "OK") { // safeguard against possibility of no viable paths available
            console.log(map)
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
        } else {
            window.alert("Request failed due to" + status)
        }
    })
}

function reset() {
    latArray = []
    lngArray = []
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: userLocationLatLng
    })
    marker = new google.maps.Marker({
        position: lat_lng,
        map: map
    })
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({ map: null });
    stepDisplay = new google.maps.InfoWindow;
    directionsDisplay.setPanel(null);
    document.getElementById("instructions").innerHTML = "";
}