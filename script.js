   var today = new Date();
   var cityInputEl = $("#cityInput");
   var cityEl = $("#City");
   var currentWeatherInfo = $("#currentweatherinfo");
   var currentWeather = $("#currentweather");
   var forecastContainer = $("#forecastcontainer");
   var container = $("#container");
   var weatherStatus = $("#weatherstatus");
   var cityList = $("#cityList");
   var historyButtons = $("#history-buttons");
   var historyCard = $("#history");
   var trash = $("#trash");
   var searchHistory = [];
   

var HandleFormSubmit = function (event) {
event.preventDefault();
// get city name value from input element
var cityname = cityEl.value.trim();
// Set city name in local storage and generate history buttons
if (cityname) {
searchHistory.push(cityname);
localStorage.setItem("weatherSearch", JSON.stringify(searchHistory));
var searchHistoryEl = document.createElement('button');
searchHistoryEl.className = "btn";
searchHistoryEl.setAttribute("data-city", cityname)
searchHistoryEl.innerHTML = cityname;
historyButtons.appendChild(searchHistoryEl);
historyCard.removeAttribute("style")
getWeatherInfo(cityname);
cityEl.value = textContent(cityEl);
}
else {

alert("Please enter a City name");
   
} 
   
}

// Get weather information from OpenWeather

var getWeatherInfo = function (cityname) {
   var apiCityUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=f97301447cbd41068af8623a398ba1fb";
   fetch(
   // Make a fetch request using city name to get latitude and longitude for city
   apiCityUrl
   )
   .then(function (cityResponse) {
   return cityResponse.json();
   })
   .then(function (cityResponse) {
   // Create variables to hold the latitude and longitude of requested city
   console.log(cityResponse)
   var latitude = cityResponse.coord.lat;
   var longitude = cityResponse.coord.lon;
   // Create variables for City name, current date and icon information for use in current Weather heading
   var city = cityResponse.name;
   var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
   var weatherIcon = cityResponse.weather[0].icon;
   var weatherDescription = cityResponse.weather[0].description;
   var weatherIconLink = "<img src='http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png' alt='" + weatherDescription + "' title='" + weatherDescription + "' />"
   
// Empty Current Weather element for new data
currentWeatherInfo.textContent = "";
container.textContent = "";
// Update <h2> element to show city, date and icon
weatherStatus.innerHTML = city + " (" + date + ") " + weatherIconLink;
// Remove class name 'hidden' to show current weather card
currentWeather.classList.remove("hidden");
forecastContainer.classList.remove("hidden");
// Return a fetch request to the OpenWeather using longitude and latitude from pervious fetch
return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=alerts,minutely,hourly&units=imperial&appid=f97301447cbd41068af8623a398ba1fb');
})
.then(function (response) {
// return response in json format
return response.json();
})
.then(function (response) {
console.log(response);
// send response data to displayWeather function for final display 
displayWeather(response);
});
};
// Display the weather on page
var displayWeather = function (weather) {
// check if api returned any weather data
if (weather.length === 0) {
weatherContainerEl.textContent = "No weather data found.";
return;
}
// Create Temperature element
var temperature = document.createElement('p');
temperature.id = "temperature";
temperature.innerHTML = "<strong>Temperature:</strong> " + weather.current.temp.toFixed(1) + "°F";
currentWeatherInfo.appendChild(temperature);
// Create Humidity element
var humidity = document.createElement('p');
humidity.id = "humidity";
humidity.innerHTML = "<strong>Humidity:</strong> " + weather.current.humidity + "%";
currentWeatherInfo.appendChild(humidity);
// Create Wind Speed element
var windSpeed = document.createElement('p');
windSpeed.id = "wind-speed";
windSpeed.innerHTML = "<strong>Wind Speed:</strong> " + weather.current.wind_speed.toFixed(1) + " MPH";
currentWeatherInfo.appendChild(windSpeed);
// Create uv-index element
var uvIndex = document.createElement('p');
var uvIndexValue = weather.current.uvi.toFixed(1);
uvIndex.id = "uv-index";
if (uvIndexValue >= 0) {
uvIndex.className = "uv-index-green"
}
if (uvIndexValue >= 3) {
uvIndex.className = "uv-index-yellow"
}
if (uvIndexValue >= 8) {
uvIndex.className = "uv-index-red"
}
uvIndex.innerHTML = "<strong>UV Index:</strong> <span>" + uvIndexValue + "</span>";
currentWeatherInfo.appendChild(uvIndex);
// Get extended forecast data
var forecastArray = weather.daily;
// Create day cards for extended forecast
for (let i = 0; i < forecastArray.length - 3; i++) {
var date = (today.getMonth() + 1) + '/' + (today.getDate() + i + 1) + '/' + today.getFullYear();
var weatherIcon = forecastArray[i].weather[0].icon;
var weatherDescription = forecastArray[i].weather[0].description;
var weatherIconLink = "<img src='http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png' alt='" + weatherDescription + "' title='" + weatherDescription + "' />"
var dayEl = document.createElement("div");
dayEl.className = "day";
dayEl.innerHTML = "<p><strong>" + date + "</strong></p>" +
"<p>" + weatherIconLink + "</p>" +
"<p><strong>Temp:</strong> " + forecastArray[i].temp.day.toFixed(1) + "°F</p>" +
"<p><strong>Humidity:</strong> " + forecastArray[i].humidity + "%</p>"
container.appendChild(dayEl);
}
}
// Load any past city weather searches
var loadHistory = function () {
searchArray = JSON.parse(localStorage.getItem("weatherSearch"));
if (searchArray) {
searchHistory = JSON.parse(localStorage.getItem("weatherSearch"));
for (let i = 0; i < searchArray.length; i++) {
var searchHistoryEl = document.createElement('button');
searchHistoryEl.className = "btn";
searchHistoryEl.setAttribute("data-city", searchArray[i])
searchHistoryEl.innerHTML = searchArray[i];
historyButtons.appendChild(searchHistoryEl);
historyCard.removeAttribute("style");
}
}
}
// Search weather using search history buttons
var buttonClickHandler = function (event) {
var cityname = event.target.getAttribute("data-city");
if (cityname) {
getWeatherInfo(cityname);
}
}
// Clear Search History
var clearHistory = function (event) {
localStorage.removeItem("weatherSearch");
historyCard.setAttribute("style", "display: none");
}
cityInputEl[0].addEventListener("submit", HandleFormSubmit);
historyButtons[0].addEventListener("click", buttonClickHandler);
trash[0].addEventListener("click", clearHistory);
loadHistory();
   
    

//     var cityInputresult = cityEl.val();
    



//  function displayFormData(){
//     // var cityValue = $("#city");
//     // var cityInputresult = cityValue.val();
//     $("#SelectedCity").text(cityInputresult);
//  }
//  $("#cityInputBtn").on("click",displayFormData);

   
// var getWeatherData =  function(cityInputresult){
//  const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityInputresult}&units=imperial&appid=431dd6371869dd989989366774b6e8c7`; // CURRENT API USING CITYNAME
// //  const url2 = `https://api.openweathermap.org/data/2.5/uvi?&lat=${lat}&lon=${lon}&units=imperial&appid=431dd6371869dd989989366774b6e8c7`; // CURRENT WEATHER API 4 UV INDEX [PASS THROUGH LON +LAT FROM URL1]
// //  const url3 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInputresult}&units=imperial&appid=431dd6371869dd989989366774b6e8c7`; // 5DAY FORECAST API
 
//  fetch(url1)
//   .then(function (cityResponse) {
//    return cityResponse.json();
// })
//   .then(function (cityResponse) {
//    console.log(cityResponse)
//    var latitude = cityResponse.coord.lat;
//    var longitude = cityResponse.coord.lon;
//    const url2 = `https://api.openweathermap.org/data/2.5/uvi?&lat=${latitude}&lon=${longitude}&units=imperial&appid=431dd6371869dd989989366774b6e8c7`
//   return fetch(url2);
// })
//    .then(function (response){
//       return response.json();
//    })
//    .then(function (response){
//       console.log(response);

//    })
// getWeatherData();
// //   fetch(url3)
// //   .then((response) => response.json())
// //   .then((data) => console.log(data));
  
// }
// // // element.addEventListener("click", displayFormData);

// // function displayButtonText2(){
// //     var buttonPull = document.querySelector(".btn");
// // }
// // }

// // a48d07fc97fb6b14e30e49da9b498827

// // Store searches in city buttons/localStorage
// // form entry changes selectedcity text to form entry 
// // todays date = moment.js
// // query and return temp, wind, humidity, and uv index using api
// // return 5day forecast to section
