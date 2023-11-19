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
    displayResults(data);
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
  return { coordinates, conditions };
}

function displayResults(data) {
  const coordinatesElement = document.getElementById("coordinates");
  const conditionsElement = document.getElementById("conditions");
  const temperatureElement = document.getElementById("temperature");
  const humidityElement = document.getElementById("humidity");
  const pressureElement = document.getElementById("pressure");
  const windElement = document.getElementById("wind");

  coordinatesElement.textContent = `Coordenadas: Latitude ${data.coordinates.lat}, Longitude ${data.coordinates.lon}`;
  conditionsElement.textContent = `Condições Atuais: ${data.conditions.description}`;

  temperatureElement.textContent = `Temperatura Atual: ${
    data.conditions.main?.temp
      ? convertKelvinToCelsius(data.conditions.main.temp) + "°C"
      : "Dados não disponíveis"
  }`;
  humidityElement.textContent = `Umidade: ${
    data.conditions.main?.humidity
      ? data.conditions.main.humidity + "%"
      : "Dados não disponíveis"
  }`;
  pressureElement.textContent = `Pressão Atmosférica: ${
    data.conditions.main?.pressure
      ? data.conditions.main.pressure + " hPa"
      : "Dados não disponíveis"
  }`;
  windElement.textContent = `Velocidade do Vento: ${
    data.conditions.wind?.speed
      ? data.conditions.wind.speed + " m/s"
      : "Dados não disponíveis"
  }, Direção do Vento: ${
    data.conditions.wind?.deg
      ? data.conditions.wind.deg + "°"
      : "Dados não disponíveis"
  }`;
}

function convertKelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}
