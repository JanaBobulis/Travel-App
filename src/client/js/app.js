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
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

//Get request to Pixabay
const getImageData = async (city) => {
    const res = await fetch(baseURL3 + apiKey3 + `&q=${city}&image_type=photo&pretty=true&category=places`);
    try {
    const image = await res.json();
    const imageData = {};
    imageData.webformatURL = image.hits[0].webformatURL;
    return image;
} catch (error) {
    console.log("error", error);
}
}

async function performAction(e) {
    /////////////COUNTDOWN//////////// 
    const end = document.getElementById("dep-date").value
    const now = new Date().getTime; 
    const departure = new Date(end).getTime();

    const daysTil =  Math.ceil(((departure-d.getTime())/(1000 * 60 * 60 * 24)));

    let city = document.getElementById('city').value;

    /////////////GEONAMES////////////////
    const geoData = await getGeonamesData(baseURL, city, apiKey);

    const res = await postData('/add', {lng: geoData.geonames[0].lng, lat: geoData.geonames[0].lat, name: geoData.geonames[0].name, date: end, left: daysTil, countryName: geoData.geonames[0].countryName});

    const lat = res.lat;
    const lon = res.lng;
    const name = res.name;

    //gets data from the above geonames response (latitude, longitude) and passes on to weatherbit
    await getWeatherbitData(lat, lon);
    await getImageData(name);

    //////////////WEATHERBIT/////////////////
    if(daysTil <= 16){
    const weatherbitData = await getWeatherbitData(lat, lon);
    
   const res2 = await postData('/add', {temp: weatherbitData.data[daysTil].temp, description: weatherbitData.data[daysTil].weather.description, icon: weatherbitData.data[daysTil].weather.icon});
    console.log("16 days forecast", res2);
    } else {
    alert("Please note, weather temperature is only available for the next 16 days. Please come back later for an accurate temperature check")
    }

    ////////////////PIXABAY////////////////
    const getPixabayData = await getImageData(name);
    const res3 = await postData('/add', {img: getPixabayData.hits[0].webformatURL});

    updateUI();
}

const updateUI = async() => {
    const req = await fetch('http://localhost:4040/all');
    try{
        console.log("UI request")
        const allData = await req.json();
        document.getElementById('longtitude').innerHTML = `Longtitude: ${allData.lng}`;
        document.getElementById('latitude').innerHTML = `Latitude: ${allData.lat}`;
        console.log(allData.lat);
        document.getElementById('placename').innerHTML = `City name: ${allData.name}`;
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('country-name').innerHTML = `Country: ${allData.countryName}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
        document.getElementById('description').innerHTML = `Description: ${allData.description}`;

    }catch(error){
        console.log("error", error);
    }
}

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


