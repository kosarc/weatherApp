//Forecast day feature

function nextDaysForecats(response) {
  let forecastDayNames = response.data.daily;
  let showDailyForecast = `<div class="row">`;
  let idToForecast = 1;
  let classToForecst = 1;

  forecastDayNames.forEach(function (forecastDays, index) {
    let weatherDescriptionForecast = forecastDays.weather[0].main;
    let data = new Date(forecastDays.dt * 1000);
    let day = data.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (index < 4) {
      showDailyForecast += ` <div  class="col">
                  <div class="card dashboard" style="width: 8rem">
                    <div id="${++idToForecast}" class="card-body ${++classToForecst} card-text"
                      >${days[day]} <br /> ${
        weatherIconForecast[weatherDescriptionForecast]
      }
                      <br /> <span class="max-temp"> ${Math.round(
                        forecastDays.temp.max
                      )}º</span> <span class="min-temp">${Math.round(
        forecastDays.temp.min
      )}º</span>
                    </div>
                  </div>
                </div> `;

      dailyForecastSelector.innerHTML = showDailyForecast;
    }
  });
  tempInfo = forecastDayNames;
  windOne = tempInfo[0].wind_speed;
  windOneF = tempInfo[0].wind_speed;
  windTwo = tempInfo[1].wind_speed;
  windTwoF = tempInfo[1].wind_speed;
  windThree = tempInfo[2].wind_speed;
  windThreeF = tempInfo[2].wind_speed;
  windFour = tempInfo[3].wind_speed;
  windFourF = tempInfo[3].wind_speed;
  showDailyForecast += `</div>`;
}
function getLocationCoords(response) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(nextDaysForecats);
}

// Main function

function initialData(cityInfo) {
  function initialPosition(response) {
    getLocationCoords(response);

    tempCurrent = response.data.main.temp;

    let weatherDescription = response.data.weather[0].main;
    let pressure = response.data.main.pressure;
    windSpeedUnit = response.data.wind.speed;
    let windRound = Math.round(windSpeedUnit);
    let humidity = response.data.main.humidity;
    let tempRound = Math.round(tempCurrent);
    let city = response.data.name;
    weatherUnit = "km/h";

    showWeatherIcon.innerHTML = weatherIconForecast[weatherDescription];
    showWeather.innerHTML = weatherDescription;
    showPessure.innerHTML = pressure;
    showWind.innerHTML = `${windRound} ${weatherUnit}`;
    showHumidity.innerHTML = humidity;
    showTemp.innerHTML = `${tempRound}º`;
    showCity.innerHTML = city;
    convertToCelsius();
  }
  function cityValue(event) {
    event.preventDefault();
    let input = document.querySelector("#exampleInputEmail1").value;
    initialData(input);
  }
  let cityName = cityInfo;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(initialPosition);
  searchForm.addEventListener("submit", cityValue);
}

//Current Button

function currentLocation() {
  function showLocationName(response) {
    let city = response.data[0].name;
    initialData(city);
  }
  function showLocation(posission) {
    let lat = posission.coords.latitude;
    let lon = posission.coords.longitude;
    let apiUrlReverse = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
    axios.get(apiUrlReverse).then(showLocationName);
  }
  navigator.geolocation.getCurrentPosition(showLocation);
}

function properMinutes() {
  if (minutes < 10) {
    return "0" + minutes;
  }
  return minutes;
}

//Convert F/C function button

function convertToCelsius() {
  for (let i = 0; i < 4; i++) {
    maxTemp[i].innerHTML = `${Math.round(tempInfo[i].temp.max)}º`;
    minTemp[i].innerHTML = ` ${Math.round(tempInfo[i].temp.min)}º`;
  }
  weatherUnit = "km/h";
  windOneF = windOne;
  windTwoF = windTwo;
  windThreeF = windThree;
  windFourF = windFour;
  showTemp.innerHTML = `${Math.round(tempCurrent)}º`;
  tempCelsius.classList.remove("change");
  tempFahrinheit.classList.add("change");
  showWind.innerHTML = `${Math.round(windSpeedUnit)} ${weatherUnit}`;
}

function convertToFahrenheit() {
  for (let i = 0; i < 4; i++) {
    maxTemp[i].innerHTML = `${Math.round(tempInfo[i].temp.max * 1.8 + 32)}º`;
    minTemp[i].innerHTML = ` ${Math.round(tempInfo[i].temp.min * 1.8 + 32)}º`;
  }
  weatherUnit = "mi/h";
  windOneF = windOne * 0.62137;
  windTwoF = windTwo * 0.62137;
  windThreeF = windThree * 0.62137;
  windFourF = windFour * 0.62137;
  showTemp.innerHTML = `${Math.round(tempCurrent * 1.8 + 32)}º`;
  tempCelsius.classList.add("change");
  tempFahrinheit.classList.remove("change");
  showWind.innerHTML = `${Math.round(windSpeedUnit * 0.62137)} ${weatherUnit}`;
  secret();
}

//Current date

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

//Icon object

let weatherIconForecast = {
  Clouds: `<i class="fa-solid fa-cloud"></i>`,
  Rain: `<i class="fa-solid fa-cloud-rain"></i>`,
  Clear: `<i class="fa-solid fa-sun"></i>`,
};

//Global variables

let apiKey = "21cf52b64168334a0b71f4d075758440";
let tempInfo = [];
let tempCurrent = null;
let windSpeedUnit = null;
let windOne = null;
let windOneF = null;
let windTwo = null;
let windTwoF = null;
let windThree = null;
let windThreeF = null;
let windFour = null;
let windFourF = null;
let weatherUnit = null;

let weatherDay = document.querySelector("#current-day");
let tempSign = document.querySelector("#temperature");
let tempCelsius = document.querySelector("#celsius");
let tempFahrinheit = document.querySelector("#fahrenheit");
let maxTemp = document.getElementsByClassName("max-temp");
let minTemp = document.getElementsByClassName("min-temp");
let currentButton = document.querySelector("#current-button");
let weatherDate = document.querySelector("#local-date");
let weatherTime = document.querySelector("#local-time");
let showWind = document.querySelector("#wind");
let showWeatherIcon = document.querySelector("#weather-icon");
let showCity = document.querySelector("#city");
let showTemp = document.querySelector("#temperature");
let showWeather = document.querySelector("#weather-description");
let showPessure = document.querySelector("#pressure");
let showHumidity = document.querySelector("#humidity");
let dailyForecastSelector = document.querySelector("#daily-forecast");
let searchForm = document.querySelector("#search-line");
let forecastButton = document.getElementsByClassName("col");

// Secret Feature

let varOne = null;
let varTwo = null;
let varThree = null;

//Weather forecast buttons

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "2") {
    tempCurrent = tempInfo[0].temp.max;
    showHumidity.innerHTML = tempInfo[0].humidity;
    showPessure.innerHTML = tempInfo[0].pressure;
    showWind.innerHTML = `${Math.round(windOneF)} ${weatherUnit}`;
    showTemp.innerHTML = maxTemp[0].innerHTML;
    showWeatherIcon.innerHTML =
      weatherIconForecast[tempInfo[0].weather[0].main];
    showWeather.innerHTML = tempInfo[0].weather[0].main;

    document.getElementById("2").classList.add("bg");
    document.getElementById("3").classList.remove("bg");
    document.getElementById("4").classList.remove("bg");
    document.getElementById("5").classList.remove("bg");
    varOne += 3;
    varTwo += 3;
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "3") {
    tempCurrent = tempInfo[1].temp.max;
    showHumidity.innerHTML = tempInfo[1].humidity;
    showPessure.innerHTML = tempInfo[1].pressure;
    showWind.innerHTML = `${Math.round(windTwoF)} ${weatherUnit}`;
    showTemp.innerHTML = maxTemp[1].innerHTML;
    showWeatherIcon.innerHTML =
      weatherIconForecast[tempInfo[1].weather[0].main];
    showWeather.innerHTML = tempInfo[1].weather[0].main;
    document.getElementById("2").classList.remove("2");
    document.getElementById("3").classList.add("bg");
    document.getElementById("2").classList.remove("bg");
    document.getElementById("4").classList.remove("bg");
    document.getElementById("5").classList.remove("bg");
    varTwo = 3;
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "4") {
    tempCurrent = tempInfo[2].temp.max;
    showHumidity.innerHTML = tempInfo[2].humidity;
    showPessure.innerHTML = tempInfo[2].pressure;
    showWind.innerHTML = `${Math.round(windThreeF)} ${weatherUnit}`;
    showTemp.innerHTML = maxTemp[2].innerHTML;
    showWeatherIcon.innerHTML =
      weatherIconForecast[tempInfo[2].weather[0].main];
    showWeather.innerHTML = tempInfo[2].weather[0].main;

    document.getElementById("2").classList.remove("2");
    document.getElementById("4").classList.add("bg");
    document.getElementById("3").classList.remove("bg");
    document.getElementById("2").classList.remove("bg");
    document.getElementById("5").classList.remove("bg");
    varTwo = 15;
    varOne = 20;
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "5") {
    tempCurrent = tempInfo[3].temp.max;
    showHumidity.innerHTML = tempInfo[3].humidity;
    showPessure.innerHTML = tempInfo[3].pressure;
    showWind.innerHTML = `${Math.round(windFourF)} ${weatherUnit}`;
    showTemp.innerHTML = maxTemp[3].innerHTML;
    showWeatherIcon.innerHTML =
      weatherIconForecast[tempInfo[3].weather[0].main];
    showWeather.innerHTML = tempInfo[3].weather[0].main;

    document.getElementById("2").classList.remove("2");
    document.getElementById("5").classList.add("bg");
    document.getElementById("3").classList.remove("bg");
    document.getElementById("2").classList.remove("bg");
    document.getElementById("4").classList.remove("bg");
    varOne = 5;
  }
});

//Current date

weatherDay.innerHTML = currentDay;
weatherTime.innerHTML = currentTime;
weatherDate.innerHTML = currentDate;

//Buttons

currentButton.addEventListener("click", currentLocation);
tempCelsius.addEventListener("click", convertToCelsius);
tempFahrinheit.addEventListener("click", convertToFahrenheit);

//Launch of the main function

function secret() {
  if (varOne === 11 && varTwo === 6) {
    document.querySelector("body").classList.add("secret");
    document.querySelector(".main").classList.add("secret");
  }
}

initialData("Kyiv");
