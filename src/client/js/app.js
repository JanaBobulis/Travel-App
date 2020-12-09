/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for Geonames
const baseURL = 'http://api.geonames.org/search?name=';
const apiKey = '&maxRows=1&type=json&maxRows=10&username=janabobulis';

// Personal API Key for Weatherbit
const baseURL2 = 'https://api.weatherbit.io/v2.0/forecast/daily?'; 
const apiKey2 = '&key=8ce0780333904b48a0c241412d32cccc';

//Get request to Geonames
const getGeonamesData = async (baseURL, city, apiKey)=>{
    const res = await fetch(baseURL + city + apiKey);
    try {
        const data = await res.json();
        console.log("Geonames get request", data);
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

//GET request to Weatherbit
const getWeatherbitData = async (lat, lng) => {
    const res = await fetch(baseURL2 + "lat=" + lat + "&lon=" + lng + apiKey2);
    try {
        const data = await res.json();
        const weatherData = {};
        weatherData.description = data.data[0].weather.description;
        weatherData.temp = data.data[0].temp;
        console.log("weatherbit get request", data);
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

// Event listener to add function to existing HTML DOM element with a callback function to execute when it is clicked. Inside that callback function call your async GET request with the parameters: base url user entered zip code (see input in html with id zip),personal API key

function performAction(e) {
    let city = document.getElementById('city').value;
    getGeonamesData(baseURL, city, apiKey)

    .then(function(geoData){
        console.log(geoData, "Geonames API works")
        return postData('/addGeonames', {lng: geoData.geonames[0].lng, lat: geoData.geonames[0].lat, date: newDate, name: geoData.geonames[0].name, countryName: geoData.geonames[0].countryName})
      
    .then(function(res) {
        console.log("response from geonames", res);
        const lat = res.lat
        const lon = res.lng
        return {lat, lon}
    })
        
    .then(function(weatherData) {
        console.log(weatherData)
        postData('/addWeatherbit', {mintemp: weatherData.data[0].min_temp, hightemp: weatherData.data[0].high_temp});
    })
    .then(function() {
        updateUI()
    })
})
}
// After your successful retrieval of the weather data, you will need to chain another Promise that makes a POST request to add the API data, as well as data entered by the user, to your app. You will need to write another async function to make this POST request. The function should receive a path and a data object. The data object should include temperature, date, user response
const updateUI = async() => {
    const req = await fetch('http://localhost:4040/all');
    try{
        const allData = await req.json();
        document.getElementById('longtitude').innerHTML = `Longtitude: ${allData.lng}`;
        document.getElementById('latitude').innerHTML = `Latitude: ${allData.lat}`;
        document.getElementById('placename').innerHTML = `City name: ${allData.name}`;
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('country-name').innerHTML = `Country: ${allData.countryName}`;
        document.getElementById('min-temp').innerHTML = `Min temperature: ${allData.mintemp}`
        document.getElementById('high-temp').innerHTML = `Min temperature: ${allData.hightemp}`

    }catch(error){
        console.log("error", error);
    }
}

//Finally, chain another Promise that updates the UI dynamically Write another async function that is called after the completed POST request. This function should retrieve data from our app, select the necessary elements on the DOM (index.html), and then update their necessary values to reflect the dynamic values for: Temperature, Date, User input
const postData = async (url ='', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        console.log(newData);
            return newData;
    } catch(error) {
        console.log('error', error);
    }
}

export { performAction }


