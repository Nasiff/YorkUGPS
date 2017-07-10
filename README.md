# YorkUGPS
A GPS web app that I sometimes used to find my way around in York. This project was a lab assignment and the GPS functionality snippet of the code was already implemented along with the error handling.

The HTML part of code was used to structure the app and it was also used to make the buttons, 'Toggle GPS'(Turn GPS on or off) and 'Next Geocache'(Jump to the next Point Of Interest).

The Javascript part of the code is responsible for pretty much everything else. Upon clicking the 'Toggle GPS' button it would call the togglegps() function which checks to see if the device supports GPS or not. The showposition() function is the function which shows your position by interpolating two fixed points on the longitude-latitude scale to find an approximate position of where you are on the map. It also includes the boundaries which avoids the pointer(me) to go outside the map.
