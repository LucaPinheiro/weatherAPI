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

export async function getCurrentConditions(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Erro ao obter condições climáticas.");
    }
  } catch (error) {
    throw new Error("Erro ao conectar-se à API de condições climáticas.");
  }
}
