# Run Around
### A fun web app that provides users with a running path in their area.

## Overview/MVP
###### This web app utilizes Google Maps API to generate running paths based on their current location and desired distance.  Upon form submission the user will see their created path as well as directions pulled from Google Maps

## Technologies
###### HTML
###### Boostrap/CSS
###### Javascript/jQuery
###### Google Maps Javascript API
###### AJAX/JSON

## Challenges/Lessons Learned

### Scope Challenge 
###### One of the main challenges was simply javascript's handling of scope. We found that setting almost all variables as undefined globals was often the best practice. 

### AJAX Request Challenge
###### This was one of the first hurdles to get over. In order to protect our API key from being viewed on github, we saved the key to a config file which was then hidden by a .gitignore file. After this, we expected to make a simple AJAX request and pass the key in as a variable, but google maps required one more step before doing. You have to make a jsonpCallback, and call the function which instantiate the map object, as process which is a little more complicated than more simple API's like Yahoo and Weather.com.  
 
### Waypoints Challenge
###### Generating a route whose start and destination also proved challenging. Google Maps is designed to take a user from point A to point B in the most efficient line possible. Our goal was to essentially take the user in a circle, something that Google Maps is not readily designed for. We ended up using triangles to generate extra points based on the user's current location. These extra points are denoted as Waypoints,a parameter Google Maps is prepared to take. A path is then generated that connects the start point,destination point, as well as the waypoints in the middle.

### Waypoints Object Challenge 
###### Once we had our waypoints, we were still not getting the path to connect because we were not passing in the waypoints' data correctly. We were passing them in as latitude, longitude objects, as we expected, yet we were still finding errors. We discovered that google maps is expecting a location: object, which has the latitude, longitude object.  So in fact, our waypoints object needed to be an object of objects.  

## Happy Victories

###### We were concerned about ensuring the path would always stay on a viable walking path, but thanks to Google Maps WALKING parameter, this was an easy victory.  

## Code Snippets

###### AJAX Request Challenge - note the jsonpCallback
```javascript
var ajaxRequest = $.ajax({
    type: 'GET',
    url: mapURL,
    url2: roadURL,
    dataType: 'jsonp',
    jsonpCallback: 'initMap',
    async: false, // this is by default false, so not need to mention
    crossDomain: true // tell the browser to allow cross domain calls.
});
```

###### Waypoints Challenge - note the object of objects
```javascript 
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
        },
```        

## TODO List
###### Add in filter mechanism based on crime right to improve user safety. 
###### Add Google Maps Elevation API to add more hills to the user's run, if desired.
###### Add marker animation.
###### Add in carousel feature for multiple maps.