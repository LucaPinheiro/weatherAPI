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
  return { coordinates, conditions };
}

function displayResults(data, cityName) {
  const coordinatesElement = document.getElementById("coordinates");
  const conditionsElement = document.getElementById("conditions");
  const temperatureElement = document.getElementById("temperature");
  const humidityElement = document.getElementById("humidity");
  const pressureElement = document.getElementById("pressure");
  const windElement = document.getElementById("wind");
  const cityCountryElement = document.getElementById("cityCountry");

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

  cityCountryElement.textContent = `Cidade: ${capitalizeFirstLetter(
    cityName
  )}`;
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
