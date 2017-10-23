// GLOBAL Vars/stuff
var mapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
var roadURL = `https://roads.googleapis.com/v1/snapToRoads?path=60.170880,24.942795|60.170879,24.942796|60.170877,24.942796&key=${apiKey}`
var userLocation;

var ajaxRequest = $.ajax({
    type: 'GET',
    url: mapURL,
    url2: roadURL,
    // url3: geoURL,
    dataType: 'jsonp',
    jsonpCallback: 'initMap',
    async: false, // this is by default false, so not need to mention
    crossDomain: true // tell the browser to allow cross domain calls.
});
// console.log(ajaxRequest)
 
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
// var currentAngle;


// var coordLocation = {
//           lat: 33.989073,
//           lng: -84.507361
//         }
// console.log(map)

// var location = {
//            lat: 33.989073,
//            lng: -84.507361
//          }

var latArray = []  
var lngArray = []
var latArray2 = []  
var lngArray2 = []
var latArray3 = []  
var lngArray3 = []
var waypoints;
var waypoints2;
var waypoints3;
var currentAngle = 90;
var currentAngle2 = 0;
var currentAngle3 = 45;
  

$(document).ready(function(){
  $('.run-form').submit(function(event){
    event.preventDefault();
    $("#instructions").show()
    $(".milesBox").show()
    reset()
    // console.log("click")
    // userLocation = $("#location").val();
    
    // console.log(typeof userLocation)
    // console.log(userLocation)
    // markerArray = []
    var address = document.getElementById("location").value;

    var x = document.getElementById("miles").selectedIndex;
    var distance = document.getElementsByTagName("option")[x].innerHTML;
    console.log(distance)
    if(distance == "1-3 miles"){
      range = .011
    }else if(distance == "3-5 miles"){
      range = .013
    }else if(distance == "5-7 miles"){
      range = .015
    }else if(distance == "7-10 miles"){
      range = .017
    }

    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results,status){
      if(status === 'OK'){
        userLocationLatLng = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          }

        console.log(userLocationLatLng)

        initMap(userLocationLatLng)
        
        console.log(userLocationLatLng)


        findCoordinates(init_lat, init_lng, range);

        calculateAndDislayRoute(
        directionsDisplay, directionsService, markerArray, stepDisplay, map, userLocation, waypoints);
      
        calculateAndDislayRoute(
        directionsDisplay2, directionsService, markerArray2, stepDisplay, map2, userLocation, waypoints2);
      
        calculateAndDislayRoute(
        directionsDisplay3, directionsService, markerArray3, stepDisplay, map3, userLocation, waypoints3);
      }else{
        // alert("not valid")
      }
      // console.log(x);
      

    })
      console.log('im  ont waitig for geocode.')
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
  map2 = new google.maps.Map(document.getElementById('map2'), {
    zoom: 14,
    center: coordLocation
  });
  map3 = new google.maps.Map(document.getElementById('map3'), {
    zoom: 14,
    center: coordLocation
  });




  // console.log(map)
  marker = new google.maps.Marker({
    position: coordLocation,
    map: map
  });
  marker2 = new google.maps.Marker({
    position: coordLocation,
    map: map2
  });
  marker3 = new google.maps.Marker({
    position: coordLocation,
    map: map3
  });


  directionsService = new google.maps.DirectionsService;
  // directionsService2 = new google.maps.DirectionsService;
  // directionsService3 = new google.maps.DirectionsService;
 
  directionsDisplay = new google.maps.DirectionsRenderer({map: map});
  directionsDisplay2 = new google.maps.DirectionsRenderer({map: map2});
  directionsDisplay3 = new google.maps.DirectionsRenderer({map: map3});


  stepDisplay = new google.maps.InfoWindow;
  directionsDisplay.setPanel(document.getElementById('instructions'));
  // google.maps.event.addDomListener(window, 'load', function(){
  //   initialize(userLocation)
  // });
}
  

  function codeAddress(){



  }


  function initialize(userLocation){
        markerArray = []
        markerArray2 = []
        markerArray3 = []
        init_lat = userLocation.lat
        console.log(init_lat)
        init_lng = userLocation.lng
        // range = 0.011
        // var mapDiv = document.getElementById('#map');
        var init_lat_lng = new google.maps.LatLng(init_lat,init_lng);
        markerArray.push(marker);
        markerArray2.push(marker2);
        markerArray3.push(marker3);
        latArray.push(init_lat_lng.lat()) /////push lat of our initial point
        lngArray.push(init_lat_lng.lng()) /////push lng of our initial point
        // console.log(geocoder)
        var myOptions = {
          zoom: 13,
          center: init_lat_lng, 
          // (same as......var lat_lng = new google.maps.LatLng(newLat,newLng))
          // mapTypeId: google.maps.MapTypeId.roadmap //////can use this one
          mapTypeId: 'roadmap' ///////or this one
        }

        // findCoordinates(init_lat, init_lng, range);
        //  calculateAndDislayRoute(
        // directionsDisplay, directionsService, markerArray, stepDisplay, map, location);
         // codeAddress()
  }

      



    function findCoordinates(lat, lng, range){
          var numOfPoints = 6;
          var degreesPerPoint = -5 /numOfPoints;
          // currentAngle = currentAngle;
          var x2;
          var y2;
          
          // var currentAngle2 = 90;
          // var currentAngle3 = 0;

          map = map; 

        for(let i=0; i <= numOfPoints; i++){
          x2 = Math.cos(currentAngle) * range;
          y2 = Math.sin(currentAngle) * range;
          newLat = lat+x2;
          newLng = lng+y2;
          // console.log(typeof newLat);
          // console.log(newLng)
          lat_lng = new google.maps.LatLng(newLat,newLng);
          marker = new google.maps.Marker({
            position: lat_lng,
            map: map,
            // visibile: false
            
          });
          latArray.push(lat_lng.lat()); ////push lats of points we just looped through and placed on map
          lngArray.push(lat_lng.lng());
          markerArray.push(marker);
          currentAngle += degreesPerPoint;
        }
          
          for(let i=0; i <= numOfPoints; i++){
          x2 = Math.cos(currentAngle2) * range;
          y2 = Math.sin(currentAngle2) * range;
          newLat = lat+x2;
          newLng = lng+y2;
          // console.log(typeof newLat);
          // console.log(newLng)
          lat_lng = new google.maps.LatLng(newLat,newLng);
          marker2 = new google.maps.Marker({
            position: lat_lng,
            map: map2,
            // visibile: false
            
          });
          latArray2.push(lat_lng.lat()); 
          lngArray2.push(lat_lng.lng());
          markerArray2.push(marker2);
          currentAngle2 += degreesPerPoint;
        }
          
          for(let i=0; i <= numOfPoints; i++){
          x2 = Math.cos(currentAngle3) * range;
          y2 = Math.sin(currentAngle3) * range;
          newLat = lat+x2;
          newLng = lng+y2;
          // console.log(typeof newLat);
          // console.log(newLng)
          lat_lng = new google.maps.LatLng(newLat,newLng);
          marker3 = new google.maps.Marker({
            position: lat_lng,
            map: map3,
            // visibile: false
            
          });
          latArray3.push(lat_lng.lat()); 
          lngArray3.push(lat_lng.lng());
          markerArray3.push(marker3);
          currentAngle3 += degreesPerPoint;

        }
          // markerArray.push(marker);
          // markerArray2.push(marker2);
          // markerArray3.push(marker3);

          // latArray.push(lat_lng.lat()) ////push lats of points we just looped through and placed on map
          // lngArray.push(lat_lng.lng()) ////push lngs of points we just looped through and placed on map

          // latArray2.push(lat_lng.lat()) 
          // lngArray2.push(lat_lng.lng())

          // latArray3.push(lat_lng.lat()) 
          // lngArray3.push(lat_lng.lng())

          // currentAngle += degreesPerPoint;
          // currentAngle2 += degreesPerPoint;
          // currentAngle3 += degreesPerPoint;
          console.log(currentAngle)
          console.log(currentAngle2)
          console.log(currentAngle3)
    };


  function calculateAndDislayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map, userLocation, waypoints){
        // console.log(markerArray)

        for(let i = 0; i < markerArray.length; i++){
          markerArray[i].setMap(null);
        }
        
        // var destination = new google.maps.LatLng(latArray[latArray.length-1],lngArray[lngArray.length-1])
        
          var origin = userLocationLatLng
        // var origin = {
        //   lat: userLocation.lat, 
        //   lng: userLocation.lng
        // }
        // console.log(typeof origin)

      waypoints = [
          { 
            location:{
              lat: latArray[1],
              lng: lngArray[1]
            }
          },
          {
            location: {
              lat:latArray[2],
              lng: lngArray[2]
            }
          },
           {
            location: {
              lat:latArray[3],
              lng: lngArray[3]
            }
          },
           {
            location: {
              lat:latArray[4],
              lng: lngArray[4]
            }
          },
          {
            location: {
              lat:latArray[5],
              lng: lngArray[5]
            }
          },
          {
            location: {
              lat:latArray[6],
              lng: lngArray[6]
            }
          }
          // {
          //   location: {
          //     lat:latArray[7],
          //     lng: lngArray[7]
          //   }
          // },
          // {
          //   location: {
          //     lat:latArray[8],
          //     lng: lngArray[8]
          //   }
          // },
          // {
          //   location: {
          //     lat:latArray[9],
          //     lng: lngArray[9]
          //   }
          // }
      ]


      waypoints2 = [
          { 
            location:{
              lat: latArray2[1],
              lng: lngArray2[1]
            }
          },
          {
            location: {
              lat:latArray2[2],
              lng: lngArray2[2]
            }
          },
           {
            location: {
              lat:latArray2[3],
              lng: lngArray2[3]
            }
          },
           {
            location: {
              lat:latArray2[4],
              lng: lngArray2[4]
            }
          },
          {
            location: {
              lat:latArray2[5],
              lng: lngArray2[5]
            }
          },
          {
            location: {
              lat:latArray2[6],
              lng: lngArray2[6]
            }
          }
      ]
          



      waypoints3 = [
          { 
            location:{
              lat: latArray3[1],
              lng: lngArray[1]
            }
          },
          {
            location: {
              lat:latArray3[2],
              lng: lngArray3[2]
            }
          },
           {
            location: {
              lat:latArray3[3],
              lng: lngArray3[3]
            }
          },
           {
            location: {
              lat:latArray3[4],
              lng: lngArray3[4]
            }
          },
          {
            location: {
              lat:latArray3[5],
              lng: lngArray3[5]
            }
          },
          {
            location: {
              lat:latArray3[6],
              lng: lngArray3[6]
            }
          }

      ]

        // console.log(waypoints)
        // console.log(waypoints2)
        // console.log(waypoints3)

        directionsService.route({
          origin: origin,
          destination: origin,
          waypoints: waypoints,
          travelMode: "WALKING",
          optimizeWaypoints: true,
          provideRouteAlternatives: true,
          avoidHighways: true,
          
          // unitSystem: UnitSystem.IMPERIAL,
        }, (response,status)=>{
          if(status === "OK"){
            document.getElementById('warning-panel').innerHTML = '<b>' + response.routes[0].warnings + '</b>';
            directionsDisplay.setMap('map')
            directionsDisplay.setDirections(response);
            // showSteps(response,markerArray, stepDisplay, map);
          }else{
            // window.alert("Request failed due to" + status)
          }
          // showSteps()
          // attachInstructionText()

        })

        directionsService.route({
          origin: origin,
          destination: origin,
          waypoints: waypoints2,
          travelMode: "WALKING",
          optimizeWaypoints: true,
          provideRouteAlternatives: true,
          avoidHighways: true,
          
          // unitSystem: UnitSystem.IMPERIAL,
        }, (response,status)=>{
          if(status === "OK"){
            document.getElementById('warning-panel').innerHTML = '<b>' + response.routes[0].warnings + '</b>';
            directionsDisplay.setMap('map2')
            directionsDisplay.setDirections(response);
            // showSteps(response,markerArray, stepDisplay, map);
          }else{
            // window.alert("Request failed due to" + status)
          }
          // showSteps()
          // attachInstructionText()

        })

        directionsService.route({
          origin: origin,
          destination: origin,
          waypoints: waypoints3,
          travelMode: "WALKING",
          optimizeWaypoints: true,
          provideRouteAlternatives: true,
          avoidHighways: true,
          
          // unitSystem: UnitSystem.IMPERIAL,
        }, (response,status)=>{
          if(status === "OK"){
            document.getElementById('warning-panel').innerHTML = '<b>' + response.routes[0].warnings + '</b>';
            directionsDisplay.setMap('map3')
            directionsDisplay.setDirections(response);
            // showSteps(response,markerArray, stepDisplay, map);
          }else{
            // window.alert("Request failed due to" + status)
          }
          // showSteps()
          // attachInstructionText()

        })
  }






  function reset(){
    // markerArray = []
    latArray = []
    lngArray = []
    map = new google.maps.Map(document.getElementById('map'),{
      zoom: 14,
      center: userLocationLatLng
    })
    marker = new google.maps.Marker({
      position: lat_lng,
      map:map
    })
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({map: map});
    stepDisplay = new google.maps.InfoWindow;
    directionsDisplay.setPanel(document.getElementById('instructions'));
  }




    var myRoute;
    var legsArray = []
  // function showSteps(directionResult, markerArray, stepDisplay, map){
  //     myRoute = directionResult.routes[0].legs
  //     console.log(myRoute)
  //     // console.log(myRoute)
  //     for(var j=0; j < directionResult.routes[0].legs.length; j++){
  //       legsArray.push(directionResult.routes[0].legs[j])
  //     }
  //     console.log(legsArray)
      // myRoute = directionResult.routes[0].legs[0]
      // console.log(myRoute)
      // for(var i = 0; i < directionResult.routes[0].legs.length; i++){
      //   marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
      //   marker.setMap(map);
      //   marker.setPosition(myRoute.steps[i].start_location);
        // attachInstructionText(
          // stepDisplay, marker, myRoute.instructions.map);
      // }
  //   }


  // function attachInstructionText(stepDisplay, marker, text, map){
  //     google.maps.event.addListener(marker, "click", function(){
  //       stepDisplay.setContent(text);
  //       stepDisplay.open(map, marker)
  //     })
  //   }

