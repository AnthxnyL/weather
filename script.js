const url = "https://api.openweathermap.org/data/2.5/";
const apiKey = "4feb11116af6dd74b35012c156cb097b";


document.addEventListener('DOMContentLoaded', function() {

    const search = document.getElementById("search");

    window.onload = function() {
        getCity('Paris');
    };

    search.addEventListener("click", () =>{

        const city = document.getElementById("city").value;
        getCity(city);

       
            
    })

    const selectCity = document.querySelectorAll(".selectCity");

    selectCity.forEach((city) => {
        city.addEventListener("click", () =>{
            const citySelected = city.textContent;
            const img = document.querySelector(".img");
            img.classList.remove("fadeInUp");
            getCity(citySelected);
        })
    })


    function getCity(city) {
        if(city === ""){
            return
        }

        fetch(`${url}weather?q=${city}&appid=${apiKey}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
            if(data.message === "city not found"){
                alert("City not found");
                return
            }

            const cityName = data.name;
            let showCity = document.querySelector(".city");
            let details = document.querySelector(".details");

            
            const timeZoneOffsetInSeconds = data.timezone;
            const timeZoneOffsetInHours = timeZoneOffsetInSeconds / 3600;
            const localTime = moment().utc().add(timeZoneOffsetInHours, 'hours');

            let dateStr = localTime.format('dddd D MMMM, HH:mm');

    
                dateStr = capitalizeFirstLetterOfWords(dateStr);
    
            showCity.innerHTML = 
            `
            <div class="deg">
                <p>${Math.round(data.main.temp)}°</p>
            </div>
            <div class="name-icon">
                <h1>${cityName}, ${data.sys.country}</h1>
                <div class="icon">
                    <img src="./icons/${data.weather[0].icon}.png" alt="${data.weather[0].icon} icon">
                </div>
            </div>
            <div class="date-description">
                <p>${dateStr}</p>
                <p>${capitalizeFirstLetterOfWords(data.weather[0].description)}</p>
            </div>
            `;

            details.innerHTML = 
            `
            <h3>Weather Details</h3>
            <div class="details-info">
                <ul class="types-name">
                    <li>Clouds</li>
                    <li>Wind</li>
                    <li>Humidity</li>
                </ul>
                <ul class="types-value">
                    <li>${data.clouds.all}%</li>
                    <li>${data.wind.speed} m/s</li>
                    <li>${data.main.humidity}%</li>
            </div>
            `;

            const img = document.querySelector(".img");
            img.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2)), url('./images/${data.weather[0].main}.jpg')`;
            console.log("fae");
            img.classList.add("fadeInUp");
        })
            
    }

    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const city = document.getElementById('city').value; 
        getCity(city);
    });
    
});


function capitalizeFirstLetterOfWords(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}