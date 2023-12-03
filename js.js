


// let API_KEY = "244a753fb286f95ec0ea1ff3efc16351";




// function dataonDisplay(data) {
//     let Display = document.createElement('p');
//     Display.innerHTML = `${data?.main?.temp.toFixed(2)} `
//     document.body.appendChild(Display);
// }
// let showData = async function showWeather() {
//     try {
//         let city = "hisar";
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
//         const data = await response.json();
//         console.log(data);
//         dataonDisplay(data);
//     }
//     catch (error) {
//         console.log("EEror aa gya");
//         alert('not fetch data')
//     }

// }



// async function showMosam() {
//     try {
//         let API_key = "244a753fb286f95ec0ea1ff3efc16351";
//         let lat = 29.1667;
//         let lon = 75.7167;
//         let resilt = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
//         let mosam = await resilt.json();
//         console.log(mosam);
//         dataonDisplay(mosam);
//     }
//     catch (Error) {
//         alert("pagal h k", Error);

//     }
// }



// function getLocation() {
//     try {

//         navigator.geolocation.getCurrentPosition(position)


//     } catch (error) {
//         console.log("pagal");

//     }
// }

// function position(position) {
//     let lat = position.coords.latitude;
//     let lon = position.coords.longitude;
//     console.log(lat);
//     console.log(lon);
// }



let userTab = document.querySelector('#Your-Weather')
let searchTab = document.querySelector('#Search-Weather')
let usercontainer = document.querySelector(".container")
let grantTab = document.querySelector('.grant-locatin')


let searchform = document.querySelector('[ searchInput]')
let loadingscreen = document.querySelector('.loading-container')
let userinfocontainer = document.querySelector('[userinfo]')
let GrantAccessButton = document.querySelector('[Grant-Access]')


// initia; varible need
let oldTab = userTab;
let API_KEY = "244a753fb286f95ec0ea1ff3efc16351";
// by default huma tab p background dekha ga
oldTab.classList.add('current-tab');
getfromsessionstorage();



//   
function switched(newTab) {
    if (newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if (!searchform.classList.contains("active")) {
            // `kya search form wala container in visble ,if yes the make it visible

            userinfocontainer.classList.remove("active");
            grantTab.classList.remove("active");
            searchform.classList.add("active");
        }

        else {
            // main ab search tab p tha ab mujha your wheather tab visible karni h 
            searchform.classList.remove("active");
            // y search wala weather info
            userinfocontainer.classList.remove("active");
            // ab main your weather tab me aa gya hu ,toh weather bhi display karna padega ,so lets check local storage first
            // for coordinates ,if we have saved them there
            getfromsessionstorage();
        }


    }
}



userTab.addEventListener('click', () => {
    // pass clicked tab as input parameter
    switched(userTab);
    console.log(userTab);
})
searchTab.addEventListener('click', () => {
    // pass clicked tab as input parameter
    switched(searchTab);
    console.log(searchTab.innerText);
})


//  ifchck if cordinate are present in sessionStorge
function getfromsessionstorage() {

    var localCoordinates = sessionStorage.getItem("user-Coordinates");
    console.log(localCoordinates);
    if (!localCoordinates) {
        // localCordinates nhi h 
        grantTab.classList.add("active");
        console.log(localCoordinates);
    }

    else {
        const coordinate = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinate);
        console.log(coordinate);
    }

}
async function fetchUserWeatherInfo(coordinate) {
    console.log("cahagyg y hhu uh");
    const { lat, lon } = coordinate;  // make grantContainer invisible  
   
    // make grandcontainer visible
    console.log("loadingScreen visible ho jay");
    try {
    grantTab.classList.remove("active");
    // make loader visible
    loadingscreen.classList.add("active");
    // API call
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const result = await response.JSON();


        loadingscreen.classList.remove("active");
        userinfocontainer.classList.add("active");
        //result m sa info ko  vale show karaga in the UI

        renderWheatherInfo(result);

    } catch (error) {
        loadingscreen.classList.remove("active");
        // 404 show karwana h is
        alert("here is not present data of lat and lon");
    }
}

function renderWheatherInfo(weatgerInfo) {
    const cityName = document.querySelector('[cityName]');

    const icon = document.querySelector('[data-countryflag]');

    const desc = document.querySelector('[data-weathery]');
    const wheatherIcon = document.querySelector('[data-weatherIcon]');
    const temp = document.querySelector('.otherData');
    const windSpeed = document.querySelector('[windspeedDisplay]');
    const humidity = document.querySelector('[HUMIDITYdISPLAY]');
    const cloudy = document.querySelector('[cloudsDisplay]');


    // fetch values fffrom weather on ui 

    cityName.innerText = weatgerInfo?.name;
    icon.src = `https://flagcdn.com/144x108/${weatgerInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatgerInfo?.weather?.[0]?.description;
    wheatherIcon.src = `http://openweathermap.org/img/w/${weatgerInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatgerInfo?.main?.temp} 0C`;
    windSpeed.innertext = weatgerInfo?.wind?.speed;
    humidity.innertext = weatgerInfo?.main?.humidity;
    cloudy.innerText = weatgerInfo?.clouds?.all;




    
}


function geoLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(po);

    } else {
        alert('nhi h bbhai sahab  ');   // 
    }

}
function po(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-Coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

GrantAccessButton.addEventListener("click", geoLocation)


// serach form 


const seachData = document.querySelector('[data-searchInput]');
searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = seachData.value;
    if (cityName === "")
        return;


    else
        fetchUserWeatherInfo(cityName);

    console.log("it i sworking from city input");
})

async function fetchUserWeatherInfo(city) {

    loadingscreen.classList.add("active");
    userinfocontainer.classList.remove("active");
    grantTab.classList.remove("active");

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const result = await response.json();
        loadingscreen.classList.remove("active");
        userinfocontainer.classList.add("active");
        
        renderWheatherInfo(result);
    } catch (err) {
        // hww
    }

}


