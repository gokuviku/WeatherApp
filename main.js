const apiKey = 'e354099168d5730daa2a62a160912f99';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        var data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if(data.weather[0].main=="Clouds"){
            weatherIcon.src = "./cloud5.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "./cloud6.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "./cloud4.png"
        }
        document.querySelector(".weather").style.display="block";

    } catch (error) {
        console.error('Error fetching weather:', error.message);
    }
}

searchbtn.addEventListener("click", () => {
    checkWeather(searchbox.value);
});
