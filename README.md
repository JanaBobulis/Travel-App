## Weather-Journal App Project
This project is made with an asynchronous web app that uses Web API and user data to dynamically update the UI in a Weather Journal application. 

## How it works 

![ezgif com-video-to-gif-11](https://user-images.githubusercontent.com/71527795/100225211-c3291400-2f15-11eb-90a0-faafeef474e3.gif)


### A note 
You can see a more thorough explanation of each step in the code. It has been built this way for studying purposes. 
This project currently uses US ZIP codes, however will be updated in the future to use UK ZIP codes.

### Setting up the project 
Node as well as the following packages need to be installed:
```
npm i express
npm i body-parser
npm i cors
```
### Server 
In the server.js file server has been set as well as the get and post route with three pieces of data that I want to be shown in the filed once submitted(_date, temperature and response_).

### Client 
- To acquire API key I've registered with the OpenWeatherMap and got personalised API key. 
- In app.js file I created 2 variable with my API key and an URL. 
- Then I wrote an async function that makes a **GET** request to the OpenWeatherMap API. 
- Added event listener to existing HTML DOM element with a callback function to execute when it is clicked. 
- Chained the promise that makes a **POST** request to add the API data as well as data entered by the user in the field. 
- Chained another promise that updates the UI dynamically and wrote an async function that is called via POST request. This function retrieves data from the app. 
