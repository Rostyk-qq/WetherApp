const container = document.querySelector('.container');
const search = document.querySelector('.search_box button');
const weather = document.querySelector('.weather_box');
const notFound = document.querySelector('.not_found');
const details = document.querySelector('.weather_details');


search.addEventListener('click', fetchInfoAboutWeather);

function fetchInfoAboutWeather(e) {
    const apiKey = '3f5e3f55d17d2e3caac4e4efb766c6f4';
    const city = e.target.previousElementSibling.value;
    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}
    &units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404'){
                container.style.height = '601px';
                weather.style.display = 'none';
                details.style.display = 'none';
                notFound.style.cssText =
                    "opacity: 1;" +
                    "scale: 1;" +
                    "display: block;";
                notFound.classList.add('fadeIn');
                return;
            }
            notFound.classList.remove('fadeIn');
            notFound.style.cssText =
                "opacity: 0;" +
                "scale: 0;" +
                "display: none;";

            const image = document.querySelector('.weather_box img');
            const temperature = document.querySelector('.weather_box .temperature');
            const description = document.querySelector('.weather_box .description');
            const humidity = document.querySelector('.weather_details .humidity span');
            const wind = document.querySelector('.weather_details .wind span');
            switch (data.weather[0].main){
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case "Rain":
                    image.src = 'images/rain.png';
                    break;
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/mist.png';
            }
            temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
            description.innerHTML = `${data.weather[0].description}`;
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`

            weather.style.display = ''
            details.style.display = ''
            weather.classList.add('fadeIn')
            details.classList.add('fadeIn')
            container.style.height = '601px';
        })
}