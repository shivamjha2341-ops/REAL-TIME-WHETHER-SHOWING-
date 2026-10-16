const startBtn = document.querySelector(".start");
const search = document.querySelector("#inputfield");
const searchIcon = document.querySelector("#searchIcon");
const desc = document.querySelector("#desc");
const temp = document.querySelector("#temp");
const cityName = document.querySelector("#city");
const wind = document.querySelector("#windSpeed");
const humidity = document.querySelector("#humidityper");
const goHome = document.querySelector(".homeBtn");
const icon = document.querySelector("#icon");

const mainBox1 = document.querySelector(".mainBox1");
const mainBox2 = document.querySelector(".mainBox2");
const mainBox3 = document.querySelector(".mainBox3");


// ---------------- START BUTTON ----------------

startBtn.addEventListener("click", () => {
    mainBox1.classList.add("inactive");
    mainBox2.classList.remove("inactive");
});


// ---------------- CHANGE WEATHER ICON ----------------

function changeIcon(weatherMain) {

    let icons = {
        Clouds: "/images/clouds.png",
        Rain: "/images/rain.png",
        Mist: "/images/mist.png",
        Haze: "/images/haze.png",
        Snow: "/images/snow.png",
        Clear: "/images/clear.png"
    };

    icon.src = icons[weatherMain] || "/images/clear.png";
}


// ---------------- API ----------------

const url = "https://api.openweathermap.org/data/2.5/weather";

const apiKey = "8ba02e135a27d41954047062d93716f4";


// ---------------- GET WEATHER DATA ----------------

async function getWeatherData(city) {

    // Check empty input
    if (city.trim() === "") {
        alert("Please enter a city name");
        return;
    }

    try {

        // Create API URL
        let finalUrl =
            `${url}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        // Fetch data
        let response = await fetch(finalUrl);

        // Convert response into JSON
        let weatherData = await response.json();

        console.log(weatherData);


        // ---------------- INVALID API KEY ----------------

        if (response.status === 401) {

            alert("Invalid API Key. Please check your OpenWeather API key.");

            return;
        }


        // ---------------- CITY NOT FOUND ----------------

        if (response.status === 404) {

            mainBox2.classList.add("inactive");
            mainBox3.classList.remove("inactive");

            search.value = "";

            return;
        }


        // ---------------- OTHER ERROR ----------------

        if (!response.ok) {

            alert("Something went wrong. Please try again.");

            return;
        }


        // ---------------- WEATHER DATA ----------------

        desc.innerHTML =
            weatherData.weather[0].description;

        temp.innerHTML =
            Math.round(weatherData.main.temp) + "°c";

        cityName.innerHTML =
            weatherData.name;

        wind.innerHTML =
            weatherData.wind.speed + " km/h";

        humidity.innerHTML =
            weatherData.main.humidity + "%";


        // Change weather icon
        changeIcon(weatherData.weather[0].main);

    }

    catch (error) {

        console.log("Error:", error);

        alert("Unable to fetch weather data.");

    }
}


// ---------------- SEARCH ICON ----------------

searchIcon.addEventListener("click", () => {

    getWeatherData(search.value);

});


// ---------------- ENTER KEY ----------------

search.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        getWeatherData(search.value);

    }

});


// ---------------- GO HOME ----------------

goHome.addEventListener("click", () => {

    mainBox3.classList.add("inactive");
    mainBox1.classList.remove("inactive");

});