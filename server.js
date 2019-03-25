const express = require('express') // Express dependency
const bodyParser = require('body-parser'); // body-parser dependency
const request = require('request'); // API call dependency
const app = express() // Creates Express object named app

const apiKey = '429e5a55f12aaaa549339afb4f3469d4'; // Mask API key later
 
app.use(express.static('public')); // Allows access to static files within public directory  
app.use(bodyParser.urlencoded({ extended: true })); // Allows use of req.body object 
app.set('view engine', 'ejs') // Creates variable named view engine and sets to ejs


app.get('/', function (req, res) {
  // res.send('Hello World!') old code 
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})