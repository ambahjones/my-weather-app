function formatDate(timestamp) {
  let now = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let hours = [
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
  ];
  let now = new Date(timestamp);
  let hour = hours[now.getHours()];
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

function displayLocationTemp(response) {
  fahrenheitTemp = response.data.main.temp;
  highTemp = response.data.main.temp_max;
  lowTemp = response.data.main.temp_min;
  speedImperial = response.data.wind.speed;
  document.querySelector("#current-day").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#emoji-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemp);
  document.querySelector("#high-major").innerHTML = Math.round(highTemp);
  document.querySelector("#low-major").innerHTML = Math.round(lowTemp);
  document.querySelector("#percent").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#speed").innerHTML = Math.round(speedImperial);
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", `https://openweathermap.org/img/wn/02d@2x.png`);
}

function displayForecast(response) {
  let showForecast = document.querySelector("#forecast");
  showForecast.innerHTML = null;
  let forecast = null;
 
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastHigh = forecast.main.temp_max;
    forecastLow = forecast.main.temp_min;
    showForecast.innerHTML += `
    <div class="col-2">
      <h3 id="forecast-time">${formatHours(forecast.dt * 1000)}</h3>
      <img src="https://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" id="forecast-icon" />
      <div id="forecast-temps">
        <strong>
          <span class="highMinor">${Math.round(
            forecastHigh
          )}</span>°</strong>/<span class="lowMinor">${Math.round(
      forecastLow
    )}</span>°
      </div>
    </div>
  `;
  }
}

function searchCity(inputCity) {
  let apiKey = "093e071e943ff87f9fc6c8107074ad0a";
  let apiSource = "api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `https://${apiSource}${inputCity}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayLocationTemp);

  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-to-search");
  searchCity(inputCity.value);
}

function getCurrent(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "093e071e943ff87f9fc6c8107074ad0a";
  let apiSource = "api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `https://${apiSource}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayLocationTemp);
}

function currentLocation(event) {
  navigator.geolocation.getCurrentPosition(getCurrent);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(
    ((fahrenheitTemp - 32) * 5) / 9
  );
  document.querySelector("#high-major").innerHTML = Math.round(
    ((highTemp - 32) * 5) / 9
  );
  document.querySelector("#low-major").innerHTML = Math.round(
    ((lowTemp - 32) * 5) / 9
  );
  document.querySelector("#speed").innerHTML = Math.round(
    speedImperial * 1.609
  );
  document.querySelector("#speed-unit").innerHTML = "kph";


}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemp);
  document.querySelector("#high-major").innerHTML = Math.round(highTemp);
  document.querySelector("#low-major").innerHTML = Math.round(lowTemp);
  document.querySelector("#speed").innerHTML = Math.round(speedImperial);
  document.querySelector("#speed-unit").innerHTML = "mph";

}

let fahrenheitTemp = null;
let highTemp = null;
let lowTemp = null;
let speedImperial = null;

let celciusLink = document.querySelector("#unit-c");
celciusLink.addEventListener("click", displayCelciusTemp);

let fahrenheitLink = document.querySelector("#unit-f");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let showCity = document.querySelector("#city-search-form");
showCity.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentLocation);

searchCity("New York");
