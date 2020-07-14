let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

let now = new Date();
let day = days[now.getDay()];
let hour = hours[now.getHours()];
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let time = document.querySelector("#current-day");
time.innerHTML = `${day}, ${hour}:${minutes}`;

function searchCity(inputCity) {
  let apiKey = "093e071e943ff87f9fc6c8107074ad0a";
  let apiSource = "api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `https://${apiSource}${inputCity.value}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayLocationTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-to-search");
  searchCity(inputCity);
}

function displayLocationTemp(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#emoji-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#highMajor").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#lowMajor").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

let showCity = document.querySelector("#city-search-form");
showCity.addEventListener("submit", handleSubmit);

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

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentLocation);

searchCity("New York");
