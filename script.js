const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBTn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img"),
arrowBack =  wrapper.querySelector("header i");
let api;
let apiKey = "c2bce31fb820e8013db45f830e6fe138";
inputField.addEventListener("keyup",e=>{
    //if users imput enter and input field is not empty
    if(e.key == "Enter" && inputField.value != ""){
        //console.log("hello");
        requestApi(inputField.value);
    }
});

locationBTn.addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError);
    }
    else{
        alert("Your browser not support geolocation api");
    }
});
function onSuccess(position){
    const{latitude, longitude} = position.coords;
    //getting lat and lon of the user device from coords object
      api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
}
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}


function requestApi(city){
  
     api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
     fetchData();
       // .catch(error => console.log(error));
}
function fetchData(){
    infoTxt.innerText = "Getting Weather Details..";
    infoTxt.classList.add("pending");
    fetch(api)
        .then(response => response.json())
        .then(result => weatherDetails(result));
}
    function weatherDetails(info){
       
        if(info.cod=="404"){
            infoTxt.classList.replace("pending","error");
            infoTxt.innerText = `${inputField.value} is not a valid city name`;
        }
        else{
            const city = info.name;
            const country = info.sys.country;
            const {description,id} = info.weather[0];
            const {feels_like, humidity, temp} = info.main;
            if(id==800){
                wIcon.src = "clear.svg"; 
            }
            else if(id>=200 && id<=232){
                wIcon.src = "strom.svg"; 
            }
            else if(id>=600 && id<=622){
                wIcon.src = "snow.svg"; 
            }
            else if(id>=701 && id<=781){
                wIcon.src = "haze.svg";
            }
            else if(id>=801 && id<=804){
                wIcon.src = "cloud.svg"; 
            }
            else if((id>=300 && id<=321) || (id>=500 && id<=531)){
                wIcon.src = "rain.svg";
            }
            wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
            wrapper.querySelector(".weather").innerText = description;
            wrapper.querySelector(".location span").innerText = `${city},${country}`;
            wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
            wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
            
            wrapper.classList.add("active");
        }
    }
    arrowBack.addEventListener("click",()=>{
        wrapper.classList.remove("active");
    })