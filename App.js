// Function to fetch weather data
async function fetchWeather(city) {
    const apiKey = '9491d20f04b4fdd52cb1888e80b4c2f4'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
  
    try {
      const response = await fetch(url); // Fetch data from API
      if (!response.ok) {
        throw new Error("Weather data not found");
      }
      const data = await response.json(); 
      return data; // Return the weather data
    } catch (error) {
      throw new Error(error.message); // Return an error message
    }
  }
  
  function updateWeatherResult(weatherData) {
    const resultDiv = document.getElementById('weather-result');
    resultDiv.innerHTML = `
      <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
      <p>${weatherData.weather[0].description}</p>
      <p>Temperature: ${weatherData.main.temp}°C</p>
      <p>Humidity: ${weatherData.main.humidity}%</p>
      <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
    `;
  }
  
  // Function to display an error message
  function displayErrorMessage(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
  }
  
  // Event handler for the weather form
  document.getElementById('weather-form').addEventListener('submit', async (event) => {
    event.preventDefault(); 
    const cityInput = document.getElementById('city-input').value.trim(); 
  
    if (cityInput === '') {
      displayErrorMessage("Please enter a city name");
      return;
    }
  
    try {
      const weatherData = await fetchWeather(cityInput); 
      updateWeatherResult(weatherData); 
      displayErrorMessage(""); 
    } catch (error) {
      displayErrorMessage("Could not fetch weather data: " + error.message); 
    }
  });
  