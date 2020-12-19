## About

This is the travel app project which obtains your destination and the date of travel and returns the information on temperature, latitude, longitude, county name, city name and photo of the city you are travelling to. Weather forecast is only available for the next 16 days due to API functionality. 

## How it works

![ezgif com-gif-maker](https://user-images.githubusercontent.com/71527795/102691315-6d3d4880-4203-11eb-9e63-21049cfea4ca.gif)

### APIs used 
Geonames, Weatherbit and Pixabay APIs were used in order to get the data. 

### To do list
As an addition, "to-do" list is available to add on items needed for the trip.

### Testing the code with Jest
1.Install Jest ```npm install --save-dev jest```
2.You can find test files in the folder called --test-- in the root of the project. There is located 3 files: 
- **formHandler.spec.js** file is testing if handleSubmit function exists and it is testing the postData. 
- **server.spec.js** file is testing post enpoint of the project
- **urlChecker.spec.js** is trying to see if test returns true on valid url, in other words if URL exists the test passes and if false input is added to the field (text or unknown URL) it returns false. 
3.To test the project run npm run test

### Service Workers
Service workers are installed in order for the project to be available when server is stopped. 

### Information about the files
In the file root you can find package.json (dependencies), Procfile(used for testing and pointing to the root of the project where it needs to run), webpack.dev.js & webpack.prod.js (plugins and module.exports), .babelrc (presets and plugins), source folder with client and server side files and finally the test file. 



