# Run Around
### A fun web app that provides users with a running path in their area.

## Overview/MVP
###### This web app utilizes Google Maps API to generate running paths based on their current location and desired distance.  Upon form submission the user will see their created path as well as directions pulled from Google Maps

## Technologies
###### HTML
###### Boostrap/CSS
###### Javascript/jQuery
###### Google Maps Javascript API

## Challenges/Lessons Learned
###### One of the main challenges was simply javascript's handling of scope. We found that setting almost all variables as undefined globals was often the best practice. 
###### Generating a route whose start and destination also proved challenging. Google Maps is designed to take a user from point A to point B in the most efficient line possible. Our goal was to essentially take the user in a circle, something that Google Maps is not readily designed for. We ended up using triangles to generate extra points based on the user's current location. These extra points are denoted as Waypoints,a parameter Google Maps is prepared to take. A path is then generated that connects the start point, destination point, as well as the waypoints in the middle. We were concerned about ensuring the path would always stay on a viable walking path, but that's to Google Maps WALKING parameter, this was an easy victory.          


## TODO List
###### Add in filter mechanism based on crime right to improve user safety. 
###### Add Google Maps Elevation API to add more hills to the user's run, if desired.
###### Add marker animation.
###### Add in carousel feature for multiple maps.