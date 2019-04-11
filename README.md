# WeatherFinder

A React and Django web-app that display weather based on the city entered by the user.

## Features

##### Start typing a city name and autosuggestions will appear

###### Autosuggestions in Desktop
![AutoSuggestions Desktop View](readme-images/autosuggestions-desktop-view.png)

###### Weather information
![Desktop View of Weather data](readme-images/desktop-view.png)

###### Respoonsive React App - works well in tablet and mobile views
<div style="margin: 0 auto">
    <img src="readme-images/autosuggestions-mobile-view.png" alt="AutoSuggestions in Mobile View"/>
    <img src="readme-images/mobile-view.png" alt="Mobile view of weather data"/>
</div>

## Installation Instructions

- After cloning the repository, `cd` into it and run following commands:

```
# Create a virtual environment for the backend
virtualenv env

# Activate the virtual environment
source env/bin/activate

# Install the packages
pip install -r requirements.txt

# Make build.sh executable 
chmod +x build.sh

# Install nodemon gloablly to auto-reload the server when making changes in the files
npm install -g nodemon

# cd into the frontend directory
cd frontend

# Install packages for the React app
npm install

# Use npm-watch to track the changes being made in the React app
npm run watch
```

- Inside the `frontend/src/APIKeys` folder, specity your GooglePlaces' API key and OpenWeatherMap's API key in the respective files.
    - Instructions to generate API keys:
        - [To setup API key for Google Places API](https://www.youtube.com/embed/Rpzp0yCAmq4?start=35)
        - [Generate OpenWeatherMap API key after signing up](https://home.openweathermap.org/api_keys)

- Now, open up a new terminal, go inside the repo and run following commands:

```
source env/bin/activate
cd backend

# To run Django dev server and watch file changes in the app
nodemon --exec python manage.py runserver
```


## Technical Details

### APIs Used:

#### [Google Places Autocomplete API](https://developers.google.com/places/web-service/autocomplete)
- To show suggestions based on the city typed in input box
- <a href="https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Ahme&types=(cities)&key=yourAPIKey">Endpoint to Display list of cities based on initials of input</a>
    - Will return JSON object of list of cities that start with "Ahme"

- [React component to use Google places Autocomplete API](https://www.npmjs.com/package/react-google-places-autocomplete)

- [Instruction to setup API keys for Google Places API](https://www.youtube.com/embed/Rpzp0yCAmq4?start=35)
    - Checkout what restrictions you need to add


#### [OpenWeatherMap API](https://openweathermap.org/current)

- To display weather based on city, country, latitude, longitude, etc.

##### OpenWeatherMap API Endpoints
- [Display weather based on City and Country name](http://api.openweathermap.org/data/2.5/weather?appid=yourAPIKey&q=Ahmedabad,%20Gujarat,%20%C3%8Dndia)

- [Display weather based on City](http://api.openweathermap.org/data/2.5/weather?appid=yourAPIKey&q=Mumbai)

- [Display weather based on Latitude longitude](http://api.openweathermap.org/data/2.5/weather?appid=yourAPIKey&lat=23&lon=72)


##### Weather display data JSON details
- Type of weather
    - weather[0].description
- Weather type icon
    - weather[0].icon
- latitude, longitude
    - coord.lon, coord.lat
- temperature (given in K) = (K-273) celcius
    - main.temp
- Humidity in %
    - main.humidity
- Wind speed (given in m/s) = ms*3.6 kmph
    - wind.speed
