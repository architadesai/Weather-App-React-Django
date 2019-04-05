import React from "react"

import weatherAPIKey from "./APIKeys/weatherAPIKey"

class WeatherDisplay extends React.Component {
    constructor() {
        super()
        this.state = {
            weatherData: {}
        }
    }

    // Use componentDidUpdate to check if state has changed, using previous state props that are passed
    componentDidUpdate(prevProps) {
        /* If current city and previous city aren't same, that is if state has changed:
         * Here, city.description will show the city name selected by user
            * Ex: "Bhavnagar, Gujarat, India" 
        */
        if(this.props.city.description !== prevProps.city.description){
            // console.log("City is ", this.props.city)
            
            // If the city object and city name exists, then fetch from weather API
            if(this.props.city && this.props.city.description) {
                const currentCity = this.props.city.description
                const endpoint = "http://api.openweathermap.org/data/2.5/weather?";
                let urlFromCity = endpoint + "appid=" + weatherAPIKey + "&q=" + currentCity;

                // console.log("inside componentDidUpdate");

                fetch(urlFromCity)
                    .then((response) => {
                        // throw error if response is NOT OK
                        if(!response.ok) { throw response }
                        // else if response is ok, return response in json format
                        return response.json()
                    })
                    // set state of weatherData and assign our response in JSON format
                    .then((jsonData) => {
                            this.setState({
                                weatherData: jsonData
                            })
                    })
                    // Show alert if the city or passed city description is not found in weather API
                    .catch( (error) => {
                        alert("Oops! This doesn't seem to be a city.\nPlease try some other city name. :)")
                    });
            }
        }
    }

    render() {
        // if weatherData has a proeprty and if we need to show weather based on if weatherIsHidden
        // console.log("From render of weather props ", this.props.weatherHidden)
        if(this.state.weatherData.weather && !this.props.weatherIsHidden) {

            // Weather object has all the data we need to display in UI
            const weatherObj = {
                latitude: this.state.weatherData.coord.lat,
                longitude: this.state.weatherData.coord.lon,
                temp: Math.round(this.state.weatherData.main.temp - 273),
                humidity: this.state.weatherData.main.humidity,
                windSpeed: Math.round(this.state.weatherData.wind.speed*3.6),
                weatherType: this.state.weatherData.weather[0].description,
                weatherIcon: this.state.weatherData.weather[0].icon
            } 
            
            // Uncomment city object in case you need to display city name in the UI
            /* 
            let cityObjAsList = this.props.city.description.split(',')
            const cityObj = {
                city: cityObjAsList[0],
                state: cityObjAsList[1],
                country: cityObjAsList[2]
            } */

            // console.log("Main weather data : ", this.state.weatherData)
            // console.log("Weather object : ", weatherObj)
            // console.log("City object : ", cityObj)

            // To get weather icon based on type of weather in the city
            const iconID = weatherObj.weatherIcon
            let iconURL = "http://openweathermap.org/img/w/" + iconID + ".png"

            return(
                <div>
                    <img src={iconURL} className="weatherLogo" alt="Weather type" />
                    <div className="weatherContent">
                        <h3 id="weatherHeading">{weatherObj.weatherType.toUpperCase()}</h3>
                        <p><span>Temperature: </span>{weatherObj.temp}&#8451;</p> <hr />
                        <p><span>Humidity: </span>{weatherObj.humidity}%</p> <hr />
                        <p><span>Wind Speed: </span>{weatherObj.windSpeed} kmph</p> <hr />
                        <p><span>Latitude: </span>{weatherObj.latitude}&deg; N</p> <hr />
                        <p><span>Longitude: </span>{weatherObj.longitude}&deg; E</p> 
                    </div>
                </div>
            )
        } else {
            return(<div></div>)
        }
    }

}

export default WeatherDisplay;
