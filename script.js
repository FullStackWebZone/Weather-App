let weather = {
    apiKey: "b161a4ea83ea1d76a8389811066bfa65",            //http://api.openweathermap.org/data/2.5/weather?q=new%20york&appid=b161a4ea83ea1d76a8389811066bfa65
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { pressure } = data.main;
    const { sunrise } = data.sys;
    const { sunset } = data.sys;
    const { temp_max } = data.main;
    const { temp_min } = data.main;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".pressure").innerText = "Pressure: " + pressure + " hpa";
    document.querySelector(".sunrise").innerText = "Sunrise: " + extractTime(sunrise);
    document.querySelector(".sunset").innerText = "Sunset: " + extractTime(sunset);
    document.querySelector(".high").innerText = "" + temp_max + " °C";
    document.querySelector(".low").innerText = "" + temp_min + " °C";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

  function extractTime(timestamp) {
      var date = new Date(timestamp * 1000);
      var h = date.getHours() % 12;
      var m = date.getMinutes();
      return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m);
    };

weather.fetchWeather("New York");



