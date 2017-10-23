// GLOBAL Vars/stuff
var mapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
var roadURL = `https://roads.googleapis.com/v1/snapToRoads?path=60.170880,24.942795|60.170879,24.942796|60.170877,24.942796&key=${apiKey}`
var userLocation;
var ajaxRequest = $.ajax({
    type: 'GET',
    url: mapURL,
    url2: roadURL,
    dataType: 'jsonp',
    jsonpCallback: 'initMap',
    async: false, // this is by default false, so not need to mention
    crossDomain: true // tell the browser to allow cross domain calls.
});
var userLocationLatLng;
var init_lat;
var init_lng;
var range;
var geocoder;
var marker;
var marker2;
var marker3;
var map;
var directionsDisplay;
var directionsService;
var stepDisplay;
var markerArray = []
var markerArray2 = []
var markerArray3 = []
var lat_lng;
var latArray = []
var lngArray = []
var latArray2 = []
var lngArray2 = []
var latArray3 = []
var lngArray3 = []
$(document).ready(function() {
    $('.run-form').submit(function(event) {
        event.preventDefault();
        $("#instructions").show()
        reset()
        var address = document.getElementById("location").value;
        var x = document.getElementById("miles").selectedIndex;
        var distance = document.getElementsByTagName("option")[x].innerHTML;
        console.log(distance)
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
        geocoder.geocode({ 'address': address }, function(results, status) {
            if (status === 'OK') {
                userLocationLatLng = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                }
                initMap(userLocationLatLng)
                findCoordinates(init_lat, init_lng, range);
                calculateAndDislayRoute(
                    directionsDisplay, directionsService, markerArray, stepDisplay, map, userLocation);
            }
        })
    });
});

function initMap(coordLocation = {
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
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({ map: map });
    stepDisplay = new google.maps.InfoWindow;
    directionsDisplay.setPanel(document.getElementById('instructions'));
}

function initialize(userLocation) {
    markerArray = []
    init_lat = userLocation.lat
    console.log(init_lat)
    init_lng = userLocation.lng
    var init_lat_lng = new google.maps.LatLng(init_lat, init_lng);
    markerArray.push(marker);
    latArray.push(init_lat_lng.lat()) /////push lat of our initial point
    lngArray.push(init_lat_lng.lng()) /////push lng of our initial point
    var myOptions = {
        zoom: 13,
        center: init_lat_lng,
        mapTypeId: 'roadmap' ///////or this one
    }
}

function findCoordinates(lat, lng, range) {
    var numOfPoints = 6;
    var degreesPerPoint = -5 / numOfPoints;
    var x2;
    var y2;
    var currentAngle = 45;
    map = map;
    for (let i = 0; i <= numOfPoints; i++) {
        x2 = Math.cos(currentAngle) * range;
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
    var waypoints = [{
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
        travelMode: "WALKING",
        optimizeWaypoints: true,
        provideRouteAlternatives: true,
        avoidHighways: true,
    }, (response, status) => {
        if (status === "OK") {
            document.getElementById('warning-panel').innerHTML = '<b>' + response.routes[0].warnings + '</b>';
            directionsDisplay.setMap('map')
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
    directionsDisplay = new google.maps.DirectionsRenderer({ map: map });
    stepDisplay = new google.maps.InfoWindow;
    directionsDisplay.setPanel(document.getElementById('instructions'));
}
var myRoute;
var legsArray = []