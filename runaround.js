$(document).ready(function(){
  $('.run-form').submit(function(event){
    event.preventDefault();
    console.log("click")
  })

  

	var mapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
  var map;
  var roadURL = `https://roads.googleapis.com/v1/snapToRoads?path=60.170880,24.942795|60.170879,24.942796|60.170877,24.942796&key=${apiKey}`
	



	 var x = $.ajax({
      type: 'GET',
      url: mapURL,
      url2: roadURL,
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
            lat: 33.7490,
            lng: -84.3880
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
    







            var init_lat = 33.7490
            var init_lng = -84.3880
            var range = 0.01

      function findCoordinates(lat, lng, range){
          var numOfPoints = 2;

          var degreesPerPoint = -2 /numOfPoints;
          var currentAngle = 90;
          var x2;
          var y2;
          // var points = new Array();
          // console.log(points)
        for(var i=0; i < numOfPoints; i++){
          x2 = Math.cos(currentAngle) * range;
          y2 = Math.sin(currentAngle) * range;
          newLat = lat+x2;
          newLng = lng+y2;
          var lat_lng = new google.maps.LatLng(newLat,newLng);
          var marker = new google.maps.Marker({
            position: lat_lng,
            map: map
          });

          currentAngle += degreesPerPoint;
        }
      }

      function initialize(){
        var mapDiv = document.getElementById('#map');
        var init_lat_lng = new google.maps.LatLng(init_lat, init_lng);
        var myOptions = {
          zoom: 13,
          center: init_lat_lng, 
          // (same as......var lat_lng = new google.maps.LatLng(newLat,newLng))
          // mapTypeId: google.maps.MapTypeId.roadmap //////can use this one
          mapTypeId: 'roadmap' ///////or this one
        }



        // var map = new google.maps.Map(mapDiv, {
        //   center: new google.maps.LatLng(init_lat, init_lng),
        //   zoom: 13,
        //   MapTypeId: google.maps.MapTypeId.ROADMAP
        // });

        // var lat_lng = new google.maps.LatLng(init_lat, init_lng);
        // var marker = new google.maps.Marker({
        //   position: lat_lng,
        //   map: map
        // });


        findCoordinates(init_lat, init_lng, range);

      }



       google.maps.event.addDomListener(window, 'load', initialize)










    //         // Try HTML5 geolocation.
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(function(position) {
    //         var pos = {
    //           lat: position.coords.latitude,
    //           lng: position.coords.longitude
    //         };
    //         var infoWindow = new google.maps.InfoWindow()
    //         infoWindow.setPosition(pos);
    //         infoWindow.setContent('Current Location');
    //         infoWindow.open(map);
    //         map.setCenter(pos);
    //       }, function() {
    //         handleLocationError(true, infoWindow, map.getCenter());
    //       });
    //     } else {
    //       // Browser doesn't support Geolocation
    //       handleLocationError(false, infoWindow, map.getCenter());
    //     }
      

    //   function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    //     infoWindow.setPosition(pos);
    //     infoWindow.setContent(browserHasGeolocation ?
    //                           'Error: The Geolocation service failed.' :
    //                           'Error: Your browser doesn\'t support geolocation.');
    //     infoWindow.open(map);
    //   }


    //   var directionsService = new google.maps.DirectionsService;
    //   console.log(directionsService)

    //   var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
    //   console.log(directionsDisplay)
    //   var stepDisplay = new google.maps.InfoWindow;

    //   calculateAndDislayRoute(
    //     directionsDisplay, directionsService, markerArray, stepDisplay, map);

    //   var onChangeHandler = function(){
    //     calculateAndDislayRoute(
    //     directionsDisplay, directionsService, markerArray, stepDisplay, map);
    //   };

    //   document.getElementById('start').addEventListener('change', onChangeHandler);
    //   document.getElementById('end').addEventListener('change', onChangeHandler);
    //   document.getElementById('startend').addEventListener('change', onChangeHandler);


    //   function calculateAndDislayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map){
    //     // console.log("test")
    //     for(var i = 0; i < markerArray.length; i++){
    //       markerArray[i].setMap(null);
    //     }
    //     // console.log("test")
    //               // console.log(directionsService.route)
    //               var start = document.getElementById('start').value
    //               var end =  document.getElementById('end').value
    //               var startend = document.getElementById('startend').value
    //     directionsService.route({
    //       origin: start,
    //       destination: end,
    //       travelMode: "WALKING",
    //       optimizeWaypoints: false
    //     }, check
    //     )
    // // Route the directions and pass the response to a function to create)
    //     function check (response,status) {
    //       if(status === "OK"){
    //         document.getElementById('warning-panel').innerHTML = '<b>' + response.routes[0].warnings + '</b>';
    //         directionsDisplay.setDirections(response);
    //         showSteps(response,markerArray, stepDisplay, map);

    //       }else{
    //         window.alert("Request failed due to" + status)
    //       }
    //     }
    //   }
    //   console.log("test")

    
    //   var myRoute;
    // function showSteps(directionResult, markerArray, stepDisplay, map){
    //   myRoute = directionResult.routes[0].legs[0];
    //   for(var i = 0; i < myRoute.steps.length; i++){
    //     var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
    //     marker.setMap(map);
    //     marker.setPosition(myRoute.steps[i].start_location);
    //     attachInstructionText(
    //       stepDisplay, marker, myRoute.steps[i].instructions.map);
    //   }
    // }

    // function attachInstructionText(stepDisplay, marker, text, map){
    //   google.maps.event.addListener(marker, "click", function(){
    //     stepDisplay.setContent(text);
    //     stepDisplay.open(map, marker)
    //   })
    // }
     var circle = new google.maps.Circle({
      map:map,
      center: uluru,
      radius: 1609,
      fillColor: '#ff0000'
      });
    




    




  // var position = new google.maps.LatLng()

 


  // $(window).bind('scroll', function() {
  //    if ($(window).scrollTop() > 600) {
  //        $('#first').fadeOut();
  //    }
  //    else {
  //        $('#first').fadeIn();
  //    }
  // });

  // setTimeout(function(){
  //   $("#myModal").modal('show')
  // }, 1000)

  }










