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
    const coordinates = await getCoordinates(cityName);
    const conditions = await getCurrentConditions(
      coordinates.lat,
      coordinates.lon
    );
    displayResults(coordinates, conditions);
    document.getElementById("resultContainer").classList.remove("hidden");
  } catch (error) {
    console.error("Erro no aplicativo:", error.message);
  }
}

function displayResults(coordinates, conditions) {
  const coordinatesElement = document.getElementById("coordinates");
  const conditionsElement = document.getElementById("conditions");

  coordinatesElement.textContent = `Coordenadas: Latitude ${coordinates.lat}, Longitude ${coordinates.lon}`;

  const feelsLike =
    conditions.feels_like !== undefined
      ? conditions.feels_like
      : "Dados não disponíveis";

  conditionsElement.textContent = `Condições Atuais: Sensação Térmica ${feelsLike}, Descrição ${conditions.description}`;
}
