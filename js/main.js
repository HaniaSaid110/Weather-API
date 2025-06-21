// let img = document.querySelector(`img`);
// let temp = document.querySelector(`h2`);
// let sunny = document.querySelector(`#text`);
// let city = document.querySelector(`#location`);
// let date = document.querySelector(`#date`);
// let humidity = document.querySelector(`#humidity`);
// let feelsLike = document.querySelector(`#feelsLike`);
// let search = document.querySelector(`input`);

// fetch(`http://api.weatherapi.com/v1/forecast.json?key=6447c7490a4545a38c121929252106&q=alexandria&days=3&aqi=no&alerts=no&lang=ar`)
// .then(response => response.json())
// .then(data => {console.log(data)
//     img.src = `${data.current.condition.icon}`;
//     console.log(img.src);
//     temp.innerHTML = `${data.current.temp_c}°C`;
//     sunny.innerHTML = `${data.current.condition.text}`;
//     city.innerHTML = `${data.location.name}`;
//     date.innerHTML = `${data.forecast.forecastday[0].date}`;
//     humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
//     feelsLike.innerHTML = `Feels Like: ${data.current.feelslike_c}°C`;

//     search.addEventListener(`input`, () => {
//         if (search.value.trim()) {
//             fetch(`http://api.weatherapi.com/v1/forecast.json?key=6447c7490a4545a38c121929252106&q=${search.value}&days=3&aqi=no&alerts=no&lang=ar`)
//             .then(response => response.json())
//             .then(data => {
//                 img.src = `${data.current.condition.icon}`;
//                 temp.innerHTML = `${data.current.temp_c}°C`;
//                 sunny.innerHTML = `${data.current.condition.text}`;
//                 city.innerHTML = `${data.location.name}`;
//                 date.innerHTML = `${data.forecast.forecastday[0].date}`;
//                 humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
//                 feelsLike.innerHTML = `Feels Like: ${data.current.feelslike_c}°C`;
//             });
//         }
//     });
// })

let weatherContainer = document.getElementById('weather-container');
let searchInput = document.getElementById('search-input');
let cityInfo = document.getElementById('city-info');
let dateToday = document.querySelector('.date-today');
let additionalInfo = document.getElementById('additional-info');
let humidity = document.querySelector('.humidity');
let precipitation = document.querySelector('.precipitation');
let sunrise = document.querySelector('.sunrise');
let sunset = document.querySelector('.sunset');

//fetch api
function fetchWeather(city = `alexandria`) {
    weatherContainer.innerHTML = '';
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=6447c7490a4545a38c121929252106&q=${city}&days=3&aqi=no&alerts=no`)
    .then(res => res.json())
    .then(data => {console.log(data);
        cityInfo.textContent = `${data.location.name.charAt(0).toUpperCase() + data.location.name.slice(1)}, ${data.location.country}`;
        dateToday.textContent = `${currentDayName}, ${data.location.localtime.split(' ')[0]}`;
        humidity.textContent = `${data.current.humidity}%`;
        precipitation.textContent = `${data.current.precip_mm} mm`;
        sunrise.textContent = `${data.forecast.forecastday[0].astro.sunrise}`;
        sunset.textContent = `${data.forecast.forecastday[0].astro.sunset}`;
        currentWeather(data.current);
        cards(data.forecast.forecastday);
        // console.log(weatherContainer.innerHTML);
    });
}

// Function to create the current weather card
function currentWeather(today){
    let weatherToday = ``;
    weatherToday = `<div class="col-sm-4 mb-3">
                            <div class="col">
                                <div class="card text-center text-bg-dark h-100">
                                    <div class="card-body">
                                        <div class="card-header">Today</div>
                                        <h2 class="card-title">${today.temp_c}°C</h2>
                                        <img src="${today.condition.icon}" alt="">
                                        <h3>${today.condition.text}</h3>
                                        <span></span>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>`
    weatherContainer.innerHTML += weatherToday;
}

// Function to create weather cards for the next days
function cards(array){
    let weatherCards = ``;
    for(let i = 1; i < array.length; i++){
        weatherCards += `<div class="col-sm-4 mb-3">
                            <div class="col">
                                <div class="card text-center text-bg-dark h-100">
                                    <div class="card-body">
                                        <div class="card-header">${daysOfWeekNames[(dayOfWeekNumber + i) % 7]}</div>
                                        <h2 class="card-title">${array[i].day.maxtemp_c}°C</h2>
                                        <img src="${array[i].day.condition.icon}" alt="">
                                        <h3>${array[i].day.condition.text}</h3>
                                        <span></span>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>`
    }
    weatherContainer.innerHTML += weatherCards;
};

//search
searchInput.addEventListener('input', () => {
    let city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        fetchWeather(); // Default to Alexandria if no input
    }
});

fetchWeather();

// Get the current date
const now = new Date();

// Get the day of the week (0 for Sunday, 1 for Monday, etc.)
const dayOfWeekNumber = now.getDay();

// Get the day of the month (1-31)
const dayOfMonthNumber = now.getDate();

// To get the name of the day of the week:
const daysOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDayName = daysOfWeekNames[dayOfWeekNumber];


console.log(`Today is ${currentDayName}, the ${dayOfMonthNumber}th of the month.`);
console.log(`tomorrow is ${daysOfWeekNames[(dayOfWeekNumber + 1) % 7]}, the ${dayOfMonthNumber + 1}th of the month.`);