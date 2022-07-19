//The main function

function initialData(cityInfo) {
  function initialPosition(response) {
    let weatherIcon = {
      Clouds: `<i class="fa-solid fa-cloud"></i>`,
      Rain: `<i class="fa-solid fa-cloud-rain"></i>`,
      Clear: `<i class="fa-solid fa-sun"></i>`,
    };
    let snowWeatherIcon = document.querySelector("#weather-icon");
    let weatherDescription = response.data.weather[0].main;
    snowWeatherIcon.innerHTML = weatherIcon[weatherDescription];
    let snowWeather = document.querySelector("#weather-description");
    snowWeather.innerHTML = weatherDescription;
    let pressure = response.data.main.pressure;
    let snowPessure = document.querySelector("#pressure");
    snowPessure.innerHTML = pressure;
    let wind = response.data.wind.speed;
    let snowWind = document.querySelector("#wind");
    let windRound = Math.round(wind);
    snowWind.innerHTML = windRound;
    let humidity = response.data.main.humidity;
    let snowHumidity = document.querySelector("#humidity");
    snowHumidity.innerHTML = humidity;
    let tempCurrent = response.data.main.temp;
    let tempRound = Math.round(tempCurrent);
    let snowTemp = document.querySelector("#temperature");
    snowTemp.innerHTML = `${tempRound}º`;
    let city = response.data.name;
    let snowCity = document.querySelector("#city");
    snowCity.innerHTML = city;

    function convertToCelsius() {
      let temp = document.querySelector("#temperature");
      temp.innerHTML = `${Math.round(tempCurrent)}º`;
      document.querySelector("#celsius").classList.remove("change");
      document.querySelector("#fahrenheit").classList.add("change");
    }

    function convertToFahrenheit() {
      let temp = document.querySelector("#temperature");
      temp.innerHTML = `${Math.round(tempCurrent * 1.8 + 32)}º`;
      document.querySelector("#celsius").classList.add("change");
      document.querySelector("#fahrenheit").classList.remove("change");
    }

    let tempCelsius = document.querySelector("#celsius");
    let tempFahrinheit = document.querySelector("#fahrenheit");
    tempCelsius.addEventListener("click", convertToCelsius);
    tempFahrinheit.addEventListener("click", convertToFahrenheit);
  }
  function city(event) {
    event.preventDefault();
    let input = document.querySelector("#exampleInputEmail1").value;
    initialData(input);
  }
  let cityName = cityInfo;
  let apiKey = "21cf52b64168334a0b71f4d075758440";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(initialPosition);

  let searchForm = document.querySelector("#search-line");
  searchForm.addEventListener("submit", city);
}

//The current Button

function currentLocation() {
  function snowLocationName(response) {
    let city = response.data[0].name;
    let snowCity = document.querySelector("#city");
    snowCity.innerHTML = city;
  }
  function snowLocation(posission) {
    let lat = posission.coords.latitude;
    let lon = posission.coords.longitude;
    let apiUrlReverse = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
    axios.get(apiUrlReverse).then(snowLocationName);
  }
  function currentPositionWeather(response) {
    let weatherIcon = {
      Clouds: `<i class="fa-solid fa-cloud"></i>`,
      Rain: `<i class="fa-solid fa-cloud-rain"></i>`,
      Clear: `<i class="fa-solid fa-sun"></i>`,
    };
    let snowWeatherIcon = document.querySelector("#weather-icon");
    let weatherDescription = response.data.weather[0].main;
    snowWeatherIcon.innerHTML = weatherIcon[weatherDescription];
    let snowWeather = document.querySelector("#weather-description");
    snowWeather.innerHTML = weatherDescription;
    let pressure = response.data.main.pressure;
    let snowPessure = document.querySelector("#pressure");
    snowPessure.innerHTML = pressure;
    let wind = response.data.wind.speed;
    let snowWind = document.querySelector("#wind");
    let windRound = Math.round(wind);
    snowWind.innerHTML = windRound;
    let humidity = response.data.main.humidity;
    let snowHumidity = document.querySelector("#humidity");
    snowHumidity.innerHTML = humidity;
    let tempCurrent = response.data.main.temp;
    let tempRound = Math.round(tempCurrent);
    let snowTemp = document.querySelector("#temperature");
    snowTemp.innerHTML = `${tempRound}º`;

    function convertToCelsius() {
      let temp = document.querySelector("#temperature");

      temp.innerHTML = `${Math.round(tempCurrent)}º`;
    }

    function convertToFahrenheit() {
      let temp = document.querySelector("#temperature");

      temp.innerHTML = `${Math.round(tempCurrent * 1.8 + 32)}º`;
    }

    let tempCelsius = document.querySelector("#celsius");
    let tempFahrinheit = document.querySelector("#fahrenheit");
    tempCelsius.addEventListener("click", convertToCelsius);
    tempFahrinheit.addEventListener("click", convertToFahrenheit);
  }

  function currentLocationWeather(posission) {
    let lat = posission.coords.latitude;
    let lon = posission.coords.longitude;
    let unit = "metric";
    let endpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${endpoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(currentPositionWeather);
  }
  navigator.geolocation.getCurrentPosition(snowLocation);
  navigator.geolocation.getCurrentPosition(currentLocationWeather);
  let apiKey = "21cf52b64168334a0b71f4d075758440";
}

function properMinutes() {
  if (minutes < 10) {
    return "0" + minutes;
  }
  return minutes;
}

//Variables

let time = new Date();
let days = time.getDay();
let minutes = time.getMinutes();
let date = time.getDate();
let month = time.getMonth();
let year = time.getFullYear();
let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wensday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentDay = dayNames[days];
let currentMonth = monthName[month];
let hours = time.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let currentTime = `${hours}:${properMinutes()}`;
let currentDate = `${date} ${currentMonth} ${year}`;
let weatherDay = document.querySelector("#current-day");
weatherDay.innerHTML = currentDay;
let weatherTime = document.querySelector("#local-time");
weatherTime.innerHTML = currentTime;
let weatherDate = document.querySelector("#local-date");
weatherDate.innerHTML = currentDate;

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentLocation);
initialData("Kyiv");
