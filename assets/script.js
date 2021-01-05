// displayDate()

// function displayDate(){
//   (function(){
//   var NowMoment = moment().format('LLL');
//   var NowDate = new Date();
//   var eDisplayMoment = document.getElementById('displayMoment');
//   eDisplayMoment.innerHTML = NowMoment;
//   })();

// };

var currentCity = [];
$("#add-city").on("click", function(event) {

    event.preventDefault();

    var cities = $("#weather-input").val().trim();
    currentCity.push(cities);
    console.log(currentCity)

    displayWeather(cities);
    fiveDay();
    storeData(cities);
  });


function storeData(currentCity){
  var searchedInfo = JSON.parse(localStorage.getItem("Search Cities"));
  searchedInfo.push(currentCity);
  localStorage.setItem("Search Cities", JSON.stringify(searchedInfo));
}

function retrieveData(){
  var savedCities = JSON.parse(localStorage.getItem("Search Cities"));
  var appendCities = $(".searched-area");

  for(var i = 0; i < savedCities.length; i++){
    console.log(savedCities[i])
    var savedCityCard = $('<p id = "city-cards">').text(savedCities[i]).on("click", function(event){
      displayWeather(event.target.innerText);
      fiveDay(event.target.innerText);
      console.log(this)
    })

    appendCities.append(savedCityCard);
  }

  console.log(savedCities)
}

retrieveData();


var APIKey = "a91b1f169fce3b21f384396ac0114bf5";

function displayWeather(city){

var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


$.ajax({
  url: queryURL1,
  method: "GET"
})
  .then(function(response) {

    console.log(queryURL1);

    console.log(response);

    $(".city").html("<h1>" + response.name + "</h1>")
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.humidity);
    
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;

    $(".temp").text("Temperature (K) " + response.main.temp);
    $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

    console.log("Wind Speed: " + response.wind.speed);
    console.log("Humidity: " + response.main.humidity);
    console.log("Temperature (F): " + tempF);
  });
  
}

function fiveDay(city){

var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

$.ajax({
  url: queryURL2,
  method: "GET"
})

.then(function(response) {

  console.log(queryURL2);

  console.log(response);

  $(".five-day").empty();

  for(var i = 0; i < response.list.length; i++){
    var time = response.list[i].dt_txt.split(" ")[1]

    if(time === "09:00:00"){
      var cardResponse = $('<div class = "card col" style="width: 10rem;">').text("Temp: " + response.list[i].main.temp);
      var humidResponse = $('<p>').text("Humidity: " + response.list[i].main.humidity)
    
      $(cardResponse).append(humidResponse);
      $(".five-day").append(cardResponse);
    }
  }



});
}

// After search of city, display weather information onto page
//          - Temp, humidity, wind speed, and UV index
// display current day weather info
// display 5-day forecast
//          - Temp and humidity
// store searched city to local storage
// keep past searched cities onto page
// Current and future dates