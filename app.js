const apiKey = "ef0b0973b783e0614ac87612ec04344b";

export async function getCoordinates(cityName) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`
    );
    const data = await response.json();
    const { lat, lon } = data[0];
    return { lat, lon };
  } catch (error) {
    console.error("Erro ao obter coordenadas:", error.message);
    throw error;
  }
}

export async function getCurrentConditions(latitude, longitude) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    );
    const data = await response.json();
    const { feels_like, weather } = data;
    const description = weather[0].description;
    return { feels_like, description };
  } catch (error) {
    console.error("Erro ao obter condições atuais:", error.message);
    throw error;
  }
}
