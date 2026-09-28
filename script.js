
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");

async function getWeather(city) {
  if (!city) return;

  loading.classList.remove("hidden");
  errorBox.classList.add("hidden");
  weatherCard.classList.add("hidden");

  try {
    const res = await fetch(
      `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!res.ok) {
  const errData = await res.json();
  throw new Error(errData.message || "Something went wrong");
}

    const data = await res.json();

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherCard.classList.remove("hidden");
  } catch (err) {
    errorBox.textContent = "❌ " + err.message;
    errorBox.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }
}

searchBtn.addEventListener("click", () => getWeather(cityInput.value.trim()));

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather(cityInput.value.trim());
});