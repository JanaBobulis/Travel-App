
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for Geonames
const baseURL = 'http://api.geonames.org/search?name=';
const apiKey = process.env.apiKey;

// Personal API Key for Weatherbit
const baseURL2 = 'https://api.weatherbit.io/v2.0/forecast/daily?'; 
const apiKey2 = process.env.apiKey2;

//Personal API Key for pixabay
const baseURL3 = "https://pixabay.com/api/";
const apiKey3 = process.env.apiKey3;

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

    const res = await postData('http://localhost:4040/add', {lng: geoData.geonames[0].lng, lat: geoData.geonames[0].lat, name: geoData.geonames[0].name, date: end, left: daysTil, countryName: geoData.geonames[0].countryName});

    const lat = res.lat;
    const lon = res.lng;
    const name = res.name;

    //gets data from the above geonames response (latitude, longitude) and passes on to weatherbit
    await getWeatherbitData(lat, lon);
    await getImageData(name);

    //////////////WEATHERBIT/////////////////
    if(daysTil <= 16){
    const weatherbitData = await getWeatherbitData(lat, lon);
    
   const res2 = await postData('http://localhost:4040/add', {temp: weatherbitData.data[daysTil].temp, description: weatherbitData.data[daysTil].weather.description, icon: weatherbitData.data[daysTil].weather.icon});
    console.log("16 days forecast", res2);
    } else {
    alert("Please note, weather temperature is only available for the next 16 days. Please come back later for an accurate temperature check")
    }

    ////////////////PIXABAY////////////////
    const getPixabayData = await getImageData(name);
    const res3 = await postData('http://localhost:4040/add', {img: getPixabayData.hits[0].webformatURL});

    updateUI();
}

const updateUI = async() => {
    const req = await fetch('http://localhost:4040/all');
    try{
        const allData = await req.json();
        document.getElementById('longitude').innerHTML = `lon: ${allData.lng}`;
        document.getElementById('latitude').innerHTML = `lat: ${allData.lat}`;
        document.getElementById('placename').innerHTML = `${allData.name}`;
        document.getElementById('country-name').innerHTML = `${allData.countryName}`;
        document.getElementById('temp').innerHTML = `${allData.temp} °C`;
        document.getElementById("countdown-entry").innerHTML = `Departure in ${allData.left} days`;
        document.getElementById('date').innerHTML = `${allData.date}`;
        
        document.getElementById('description').innerHTML = `${allData.description}`;

        if(document.getElementById('dest-image')){
            document.getElementById('dest-image').setAttribute('src', `${allData.img}`)
        } else {
            const destImage = document.createElement("img");
            document.getElementById("destination-img").appendChild(destImage);
            destImage.setAttribute('id', 'dest-image')
            destImage.src = `${allData.img}`;
        }

        if(document.getElementById('icon-holder')){
            let weatherIcon = `https://www.weatherbit.io/static/img/icons/${allData.icon}.png`;
            document.getElementById('icon-holder').setAttribute('src', weatherIcon)
        } else {
            let createIconHolder = document.createElement("img");
            document.getElementById("icon").appendChild(createIconHolder);
            let weatherIcon = `https://www.weatherbit.io/static/img/icons/${allData.icon}.png`;
            createIconHolder.setAttribute('src', weatherIcon);
            createIconHolder.setAttribute('id', 'icon-holder')
        }
    }catch(error){
        console.log("error", error);
    }
}

const postData = async (url ='', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        cache: 'no-cache',
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
export { getGeonamesData }
export { getWeatherbitData }
export { getImageData }


