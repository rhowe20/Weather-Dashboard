var city = []

$("#add-city").on("click", function(event) {

    event.preventDefault();

    var cities = $("#weather-input").val().trim();
    city.push(cities);
    console.log(city)

    displayWeather();

  });

function displayWeather(){

var APIKey = "a91b1f169fce3b21f384396ac0114bf5";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

$.ajax({
  url: queryURL,
  method: "GET"
})
  .then(function(response) {

    console.log(queryURL);

    console.log(response);

    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
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

// After search of city, display weather information onto page
//          - Temp, humidity, wind speed, and UV index
// display current day weather info
// display 5-day forecast
//          - Temp and humidity
// store searched city to local storage
// keep past searched cities onto page
// Current and future dates