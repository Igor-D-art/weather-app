const input = document.getElementById('location');

input.addEventListener('keypress', (Event) => {
    if (Event.key == 'Enter') {
        getWeather(input.value);
    };
});


async function getWeather(location) {
    const apiCall = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=fa2305ce34f4ebc710e4b3e07e59ec92`, { mode: 'cors' });
    // if response is OK
    if (apiCall.ok) {
        let json = await apiCall.json();
       // creating an object that contains weather details from a chosen location
        const weatherAtLocation = {
            location: json.name,
            country: json.sys.country,
            kDeg: parseInt(json.main.temp),
            cDeg: parseInt(json.main.temp - 273.15),
            weather: json.weather[0].main,
            description: json.weather[0].description,
            windSpeed: json.wind.speed,
            feelsLike: json.main.feels_like,
            humidity: json.main.humidity,
        };
        console.log(json);
        console.log(weatherAtLocation);
        console.log(weatherAtLocation.cDeg);
        console.log(parseFloat(weatherAtLocation.kDeg))
    } else {
        alert('Bad request. Try again');
        input.value = "";
    };
};
