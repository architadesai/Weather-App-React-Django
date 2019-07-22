import React from "react"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import WeatherDisplay from "./WeatherDisplay";

import placesAPIKey from "./APIKeys/placesAPIKey.js"


class App extends React.Component {
    
    // input reference to access it through DOM API in React
    inputRef = React.createRef();

    constructor() {
		super();
		this.state = {
            city: {},
            weatherData: {},
            description: {},
            weatherIsHidden: false
        }
        this.clearInput =  this.clearInput.bind(this)        
    }
    
    componentDidMount () {
        // To load GooglePlacesAutocomplete API
        const script = document.createElement("script");

        const endpoint1 = "https://maps.googleapis.com/maps/api/js?key="
        const endpoint2 = "&libraries=places"
        let url = endpoint1 + placesAPIKey + endpoint2

        script.src = url;
        script.async = true;
        document.body.appendChild(script);
    }

    clearInput(event) {
        event.preventDefault();
        // Setting state of <GooglePlacesAutocomplete /> component
        // console.log(this.inputRef.current)
        // console.log(this.inputRef.current.state.value)
        // this.inputRef.current.state.value = ""
        
        // Empties the suggestions array and input value
        this.inputRef.current.setState({
            value: "",
            suggestions: []
        })

        // Upon clicking cross icon, weatherData will also be hidden 
        // and city object will be empty
        this.setState({
            city: {},
            weatherIsHidden: true
        })
    }
    
    render(){
        // For input tag
        const inputStyles = {
            width: "100%"
        }
        // console.log("testing6")
        // console.log(this.inputRef)
        // console.log("weather hidden from app.js ", this.state.weatherIsHidden)

		return(
            <div className="container background">
                <div className="header">
                    <h3>Welcome to</h3>
                    <h1 id="brand-name">WeatherFinder!</h1>
                    <p id="brand-description">Your go to place to look up the weather.</p>
                </div> 
                
                {/* Use ref to access DOM elements in React */}
                <GooglePlacesAutocomplete
                        placeholder="Type a city name here"
                        inputStyle={inputStyles} 
                        ref={this.inputRef}
                        onSelect={(description) => (
                            this.setState({ 
                                city: description,  // city state object will get selected city name 
                                weatherIsHidden: false // weather will not be hidden
                            })
                        )}
                />
                
                {/* Clearing input on clicking X */}
                <span onClick={this.clearInput} className="clear-input">X</span>
                
                {/* Passing city object to WeatherDisplay component 
                  * WeatherDisplay component will be hidden based on weatherIsHidden state
                */}
                <WeatherDisplay city={this.state.city} weatherIsHidden = {this.state.weatherIsHidden}/>

            </div>
        )
    } 
}

export default App

