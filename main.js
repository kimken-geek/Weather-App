var input = document.querySelector('.btn');
var timeEl = document.getElementById('time');
var dateEl = document.getElementById('date');
var loc = document.querySelector('#location');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const API ='447dd608d6b56b635c02bdd97355499c';

setInterval(() => {
  const time = new Date();
  const month = time.getMonth();
  const date = time.getDate();
  const day = time.getDay();
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
  const minutes = time.getMinutes();
  const ampm = hour >=12 ? 'PM' : 'AM'

  timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

  dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);


//weather API

window.addEventListener('load', () => {
  let long;
  let lat;
  // Accessing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude values in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API}&units=metric`;

      // Using fetch to get data
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data)=>{
          var nameValue = data ['name']
          var tempValue = data['main']['temp'];
          var descValue = data['weather'] [0]['description']
          //Interact with DOM
          loc.innerHTML = nameValue;
          temp.innerHTML = "It is currently "+tempValue+" °C";
          desc.innerHTML = "Description: "+descValue.toUpperCase();
        })
    });
  }
});







