$(document).ready(function(){
  $('.run-form').submit(function(event){
    event.preventDefault();
    console.log("click")
  })

  
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
  });

  
 function initMap() {
  var markerArray = []
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
    

            // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var infoWindow = new google.maps.InfoWindow()
            infoWindow.setPosition(pos);
            infoWindow.setContent('Current Location');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }


      // var directionsService = new google.maps.DirectionsService ;
      // var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
      // var stepDisplay = new google.maps.InfoWindow;

      // calculateAndDislayRoute(
      //   directionsDisplay, directionsService, markerArray, stepDisplay, map);

      // var onChangeHandler = function(){
      //   calculateAndDislayRoute(
      //   directionsDisplay, directionsService, markerArray, stepDisplay, map);
      // };

      // document.getElementById('start').addEventListener('change', onChangeHandler);
      // document.getElementById('end').addEventListener('change', onChangeHandler);

      // function calculateAndDislayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map){
      //   for(var i = 0; i < markerArray.length; i++){
      //     markerArray[i].setMap(null);
      //   }

      //   directionsService.route({
      //     origin: document.getElementById('start').value;
      //     destination: document.getElementById('end').value;
      //     travelMode: WALKING;

      //   }function(response,status){
          
      //   })
      // }

    }


  // $(window).bind('scroll', function() {
  //    if ($(window).scrollTop() > 600) {
  //        $('#first').fadeOut();
  //    }
  //    else {
  //        $('#first').fadeIn();
  //    }
  // });

  setTimeout(function(){
    $("#myModal").modal('show')
  }, 1000)

  










