import './style.css';

const input = document.getElementById('location');
const switcher = document.getElementById('deg');
let cDeg = true;
let locationObj;

function displayWeather(weatherObj) {
  const temp = document.getElementsByClassName('temp');
  const location = document.getElementsByClassName('location');
  const feels = document.getElementsByClassName('feelslike');
  location[0].textContent = weatherObj.location;
  const country = document.getElementsByClassName('country');
  country[0].textContent = weatherObj.country;

  const description = document.getElementsByClassName('description');
  description[0].textContent = weatherObj.description;

  const speed = document.getElementsByClassName('windspeed');
  speed[0].textContent = `Wind speed ${weatherObj.windSpeed} knots`;

  const humidity = document.getElementsByClassName('humidity');
  humidity[0].textContent = `Humidity ${weatherObj.humidity}%`;

  if (cDeg) {
    temp[0].innerHTML = `${weatherObj.cDeg}&#176C`;
    feels[0].innerHTML = `Feels like ${weatherObj.feelsLikeC}&#176C`;
  } else {
    temp[0].innerHTML = `${weatherObj.kDeg}&#176K`;
    feels[0].innerHTML = `Feels like ${weatherObj.feelsLikeK}&#176K`;
  }
}

async function getWeather(location) {
  const errorSpan = document.getElementById('error');
  const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=fa2305ce34f4ebc710e4b3e07e59ec92`, { mode: 'cors' });
  // if response is OK
  if (apiCall.ok) {
    const json = await apiCall.json();
    // creating an object that contains weather details from a chosen location
    locationObj = {
      location: json.name,
      country: json.sys.country,
      kDeg: parseInt(json.main.temp, 10),
      cDeg: parseInt(json.main.temp - 273.15, 10),
      weather: json.weather[0].main,
      description: json.weather[0].description,
      windSpeed: json.wind.speed,
      feelsLikeC: parseInt(json.main.feels_like - 273.15, 10),
      feelsLikeK: parseInt(json.main.feels_like, 10),
      humidity: json.main.humidity,
    };
    errorSpan.innerHTML = '';
    displayWeather(locationObj);
  } else {
    errorSpan.innerHTML = 'Location not found. Please try again';
    input.value = '';
  }
}

input.addEventListener('keypress', (Event) => {
  if (Event.key === 'Enter') {
    getWeather(input.value);
  }
});

switcher.addEventListener('change', () => {
  if (switcher.checked) {
    cDeg = false;
    displayWeather(locationObj);
  } else {
    cDeg = true;
    displayWeather(locationObj);
  }
});

getWeather('kharkiv');
