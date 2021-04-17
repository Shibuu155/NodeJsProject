const submitCity = document.getElementById('submitCity');
const cityName = document.getElementById('cityName');
const placeName = document.getElementById('placeName');
const todayDay = document.getElementById('todayDay');
const todayDate = document.getElementById('todayDate');
const tempNow = document.getElementById('tempNow');
const tempStatus = document.getElementById('tempStatus');
const dataHide =  document.querySelector('.data_hide');

const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const date = new Date();
todayDay.innerText =  weekDays[date.getDay()];
const months = ['JAN','FEB','MAR','APR','MAY','JUNE','JULY','SEP','OCT','NOV','DEC'];
let today_date = date.getDate();
let month = months[date.getMonth()];
todayDate.innerText = `${today_date} ${month}`;




const getInfo = async(event) =>{
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        placeName.innerText =  `Please write City Name`;
        dataHide.classList.add('data_hide')
    }else{
        try{
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=4952e65dca5ce4845ce0d0945bc1cbb4`
        const response = await fetch(url);
        const data = await response.json();
        const dataInArray = [data];    
        placeName.innerText = `${dataInArray[0].name},${dataInArray[0].sys.country}`;
        let tempInCelcius = dataInArray[0].main.temp - 273.15;
        tempNow.innerText = `${tempInCelcius.toFixed(2)}`;
        let tempStts = dataInArray[0].weather[0].main;
        if(tempStts == "Rain"){
            tempStatus.innerHTML = "<i class='fas fa-cloud-showers-heavy' style='color:#a4b0be;'></i>";
        }else if(tempStts == "Sunny"){
            tempStatus.innerHTML = "<i class='fas fa-sun' style='color:#eccc68;'></i>";
        }else if(tempStts == "Clouds"){
            tempStatus.innerHTML = "<i class='fas fa-cloud' style='color: #dfe4ea;'></i>";
        }else{
            tempStatus.innerHTML = "<i class='fas fa-cloud' style='color: #44c3de;'></i>"
        }
        dataHide.classList.remove('data_hide');

        }catch{
            placeName.innerText =`Please Enter the city name Properly`
            dataHide.classList.add('data_hide');
        }
    }

    
    
    
}

submitCity.addEventListener('click',getInfo);