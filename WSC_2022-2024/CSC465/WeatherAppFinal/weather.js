/* 	ADV WEB DEVELOPMENT
	  Final Project: Weather App
	  
	  Author: Aaron Mahoney
	  Date:   4/16/2024
	  
	  The main sorce for this project was: chatgpt https://chat.openai.com/
	  Weather data pulled from Open Weather API https://openweathermap.org/api
	  Weather icons pulled from Open Weather Icon List https://openweathermap.org/weather-conditions#Icon-list
	  
	  Filename: weather.js
 */
 
function getWeather() {
  const cityInput = document.getElementById('cityInput');
  const cityName = cityInput.value.trim();
  
  if (cityName === '') {
    alert('Please enter a city name');
    return;
  }

  const apiKey = 'a543430f1d17a7d8dcbd18c833ec1652'; // api key from https://openweathermap.org/api
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherInfo = document.getElementById('weatherInfo');
      weatherInfo.innerHTML = `
        <img
			class "fit-picture"
			src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
			alt="icon" 
		/>
		<h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature:             ${data.main.temp} &deg;F</p>
        <p>Description:              ${data.weather[0].description}</p>
		<p>Feels Like:                ${data.main.feels_like} &deg;F</p>
        <p>Max Temperature:     ${data.main.temp_max} &deg;F</p>
		<p>Min Temperature:     ${data.main.temp_min} &deg;F</p>
		<p>Air Pressure:            ${data.main.pressure} mb</p>
		<p>Humidity:             ${data.main.humidity}%</p>
      `;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again.');
    });
}
