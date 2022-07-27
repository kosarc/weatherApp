//Forecast day feature

function nextDaysForecats(response) {
  let forecastDayNames = response.data.daily;
  let snowDailyForecast = `<div class="row">`;
  let idToForecast = 1;
  let classToForecst = 1;

  forecastDayNames.forEach(function (forecastDays, index) {
    let weatherDescriptionForecast = forecastDays.weather[0].main;
    let data = new Date(forecastDays.dt * 1000);
    let day = data.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (index < 4) {
      snowDailyForecast += ` <div  class="col">
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

      dailyForecastSelector.innerHTML = snowDailyForecast;
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
  snowDailyForecast += `</div>`;
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

    snowWeatherIcon.innerHTML = weatherIconForecast[weatherDescription];
    snowWeather.innerHTML = weatherDescription;
    snowPessure.innerHTML = pressure;
    snowWind.innerHTML = `${windRound} ${weatherUnit}`;
    snowHumidity.innerHTML = humidity;
    snowTemp.innerHTML = `${tempRound}º`;
    snowCity.innerHTML = city;
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
  function snowLocationName(response) {
    let city = response.data[0].name;
    initialData(city);
  }
  function snowLocation(posission) {
    let lat = posission.coords.latitude;
    let lon = posission.coords.longitude;
    let apiUrlReverse = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
    axios.get(apiUrlReverse).then(snowLocationName);
  }
  navigator.geolocation.getCurrentPosition(snowLocation);
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
  snowTemp.innerHTML = `${Math.round(tempCurrent)}º`;
  tempCelsius.classList.remove("change");
  tempFahrinheit.classList.add("change");
  snowWind.innerHTML = `${Math.round(windSpeedUnit)} ${weatherUnit}`;
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
  snowTemp.innerHTML = `${Math.round(tempCurrent * 1.8 + 32)}º`;
  tempCelsius.classList.add("change");
  tempFahrinheit.classList.remove("change");
  snowWind.innerHTML = `${Math.round(windSpeedUnit * 0.62137)} ${weatherUnit}`;
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
let snowWind = document.querySelector("#wind");
let snowWeatherIcon = document.querySelector("#weather-icon");
let snowCity = document.querySelector("#city");
let snowTemp = document.querySelector("#temperature");
let snowWeather = document.querySelector("#weather-description");
let snowPessure = document.querySelector("#pressure");
let snowHumidity = document.querySelector("#humidity");
let dailyForecastSelector = document.querySelector("#daily-forecast");
let searchForm = document.querySelector("#search-line");
let forecastButton = document.getElementsByClassName("col");

//Weather forecast buttons

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "2") {
    snowHumidity.innerHTML = tempInfo[0].humidity;
    snowPessure.innerHTML = tempInfo[0].pressure;
    snowWind.innerHTML = `${Math.round(windOneF)} ${weatherUnit}`;

    snowTemp.innerHTML = maxTemp[0].innerHTML;
    document.getElementById("2").classList.add("bg");
    document.getElementById("3").classList.remove("bg");
    document.getElementById("4").classList.remove("bg");
    document.getElementById("5").classList.remove("bg");
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "3") {
    snowHumidity.innerHTML = tempInfo[1].humidity;
    snowPessure.innerHTML = tempInfo[1].pressure;
    snowWind.innerHTML = `${Math.round(windTwoF)} ${weatherUnit}`;
    snowTemp.innerHTML = maxTemp[1].innerHTML;
    document.getElementById("2").classList.remove("2");
    document.getElementById("3").classList.add("bg");
    document.getElementById("2").classList.remove("bg");
    document.getElementById("4").classList.remove("bg");
    document.getElementById("5").classList.remove("bg");
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "4") {
    snowHumidity.innerHTML = tempInfo[2].humidity;
    snowPessure.innerHTML = tempInfo[2].pressure;
    snowWind.innerHTML = `${Math.round(windThreeF)} ${weatherUnit}`;
    snowTemp.innerHTML = maxTemp[2].innerHTML;
    document.getElementById("2").classList.remove("2");
    document.getElementById("4").classList.add("bg");
    document.getElementById("3").classList.remove("bg");
    document.getElementById("2").classList.remove("bg");
    document.getElementById("5").classList.remove("bg");
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "5") {
    snowHumidity.innerHTML = tempInfo[3].humidity;
    snowPessure.innerHTML = tempInfo[3].pressure;
    snowWind.innerHTML = `${Math.round(windFourF)} ${weatherUnit}`;
    snowTemp.innerHTML = maxTemp[3].innerHTML;

    document.getElementById("2").classList.remove("2");
    document.getElementById("5").classList.add("bg");
    document.getElementById("3").classList.remove("bg");
    document.getElementById("2").classList.remove("bg");
    document.getElementById("4").classList.remove("bg");
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

initialData("Kyiv");
