import WeatherApiKey from './apikey.js';

const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');

const cardWeather = document.querySelector('#cardWeather');

const detailCard = document.querySelector('#detailCard');
const containerHumidity = document.querySelector('#container_humidity');
const containerWind = document.querySelector('#container_wind');

const itemHumidity = document.querySelector('#itemHumidity');
const itemWind = document.querySelector('#itemWind');

const apiKey = WeatherApiKey;

weatherForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      console.log(weatherData);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.log(error);
      errorDisplayWeather(error);
    }
  } else {
    errorDisplayWeather('Masukkan Nama Kota');
  }
});

const getWeatherData = async (city) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=id&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Kota yang kamu cari tidak ada');
  }

  return await response.json();
};

const displayWeatherInfo = (data) => {
  const {
    name,
    main: { temp, humidity },
    weather: [{ id, description }],
    wind: { speed },
  } = data;

  cardWeather.innerText = '';
  detailCard.innerText = '';
  containerHumidity.innerText = '';
  containerWind.innerText = '';
  itemHumidity.innerText = '';
  itemWind.innerText = '';

  const weatherEmoji = document.createElement('h1');
  const tempDisplay = document.createElement('h1');
  const cityDisplay = document.createElement('h1');
  const weatherDesc = document.createElement('p');

  const emojiHumidity = document.createElement('p');
  const humidityDisplay = document.createElement('p');

  const emojiWind = document.createElement('p');
  const windDisplay = document.createElement('p');

  const textDetailHumidity = document.createElement('p');
  const textDetailWind = document.createElement('p');

  weatherEmoji.classList.add('weatherEmoji');
  tempDisplay.classList.add('tempDisplay');
  cityDisplay.classList.add('cityDisplay');
  weatherDesc.classList.add('weatherDesc');

  weatherEmoji.innerText = getEmojiWeather(id);
  tempDisplay.innerText = `${(temp - 273.15).toFixed(1)}`;
  cityDisplay.innerText = name;
  weatherDesc.innerText = description;

  emojiHumidity.classList.add('emoji_humidity');
  emojiHumidity.innerText = `🌫`;

  humidityDisplay.classList.add('humidityDisplay');
  humidityDisplay.innerText = `${humidity}%`;

  textDetailHumidity.classList.add('text_detail');
  textDetailHumidity.innerText = `Kelembaban`;

  emojiWind.classList.add('emoji_wind');
  emojiWind.innerText = `💨`;

  windDisplay.classList.add('windDisplay');
  windDisplay.innerText = `${(speed * 3.6).toFixed(1)} km/h`;

  textDetailWind.classList.add('text_detail');
  textDetailWind.innerText = `Kecepatan Angin`;

  itemWind.appendChild(windDisplay);
  itemWind.appendChild(textDetailWind);

  containerWind.appendChild(emojiWind);
  containerWind.appendChild(itemWind);

  itemHumidity.appendChild(humidityDisplay);
  itemHumidity.appendChild(textDetailHumidity);

  containerHumidity.appendChild(emojiHumidity);
  containerHumidity.appendChild(itemHumidity);

  detailCard.appendChild(containerHumidity);
  detailCard.appendChild(containerWind);

  cardWeather.appendChild(weatherEmoji);
  cardWeather.appendChild(tempDisplay);
  cardWeather.appendChild(cityDisplay);
  cardWeather.appendChild(weatherDesc);
  cardWeather.appendChild(detailCard);
};

const getEmojiWeather = (weatherId) => {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return '⛈️';
    case weatherId >= 300 && weatherId < 500:
      return '🌦️';
    case weatherId >= 500 && weatherId < 600:
      return '🌧️';
    case weatherId >= 600 && weatherId < 700:
      return '❄️';
    case weatherId >= 700 && weatherId < 800:
      return '🌫️';
    case weatherId === 800:
      return '☀️';
    case weatherId >= 801 && weatherId < 900:
      return '☁️';
    default:
      return '❓';
  }
};

const errorDisplayWeather = (message) => {
  cardWeather.innerText = '';

  const errorDisplay = document.createElement('p');
  errorDisplay.classList.add('errorDisplay');

  errorDisplay.innerText = message;
  cardWeather.appendChild(errorDisplay);
};
