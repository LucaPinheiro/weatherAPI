import { getCoordinates, getCurrentConditions } from "./app.js";

document.getElementById("consultButton").addEventListener("click", getWeather);

async function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const cityName = cityInput.value;

  if (!cityName) {
    alert("Por favor, digite o nome da cidade.");
    return;
  }

  try {
    const data = await getWeatherData(cityName);
    displayResults(data, cityName);
    document.getElementById("resultContainer").classList.remove("hidden");
  } catch (error) {
    console.error("Erro no aplicativo:", error.message);
  }
}

async function getWeatherData(cityName) {
  const coordinates = await getCoordinates(cityName);
  const conditions = await getCurrentConditions(
    coordinates.lat,
    coordinates.lon
  );
  return { coord: coordinates, ...conditions };
}

function displayResults(data, cityName) {
  const coordinatesElement = document.getElementById("coordinates");
  const conditionsElement = document.getElementById("conditions");
  const temperatureElement = document.getElementById("temperature");
  const humidityElement = document.getElementById("humidity");
  const pressureElement = document.getElementById("pressure");
  const windElement = document.getElementById("wind");
  const cityCountryElement = document.getElementById("cityCountry");

  coordinatesElement.textContent = `Coordenadas: Latitude ${data.coord.lat}, Longitude ${data.coord.lon}`;

  if (data.weather && data.weather.length > 0) {
    conditionsElement.textContent = `Condições Atuais: ${data.weather[0].description}`;
  } else {
    conditionsElement.textContent = "Dados não disponíveis";
  }

  temperatureElement.textContent = `Temperatura Atual: ${
    data.main?.temp
      ? convertKelvinToCelsius(data.main.temp) + "°C"
      : "Dados não disponíveis"
  }`;
  humidityElement.textContent = `Umidade: ${
    data.main?.humidity || "Dados não disponíveis"
  }%`;
  pressureElement.textContent = `Pressão Atmosférica: ${
    data.main?.pressure || "Dados não disponíveis"
  } hPa`;
  windElement.textContent = `Velocidade do Vento: ${
    data.wind?.speed || "Dados não disponíveis"
  } m/s, Direção do Vento: ${data.wind?.deg || "Dados não disponíveis"}`;

  cityCountryElement.textContent = `Cidade: ${capitalizeFirstLetter(
    cityName
  )}, País: ${data.sys?.country || "Dados não disponíveis"}`;
}

function convertKelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}

function capitalizeFirstLetter(string) {
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
