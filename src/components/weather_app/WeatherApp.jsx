import React, { useState } from 'react';
import './WeatherApp.css';
import clear_icon from '../assets/clear.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';
import cloud_icon from '../assets/cloud.png';
// import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import search_icon from '../assets/search.png';
let message = "Search Icon";
const WeatherApp = () => {

    let apiKey = "MKMQSSAR7DKZWUTBBAZNJZPLN";
    // let city_name="Mumbai";
    const [weatherIcon,setWeatherIcon]= useState(rain_icon);
    const search = async () => {
        
        const city_name = document.getElementsByClassName("cityName");
        console.log(city_name);
        if (city_name[0].value === "") {
            console.log("Empty");
            return 0;
        }
        else {
            console.log(city_name[0].value);
        }
        let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city_name[0].value}?unitGroup=metric&key=${apiKey}`;
        console.log(url);
        let responseData = await fetch(url);
        responseData = await responseData.json();
        const temperature=document.getElementsByClassName("temperature");
        temperature[0].innerHTML=responseData.days[0].temp+"°C";
        const wind_speed = document.getElementsByClassName("windSpeed");
        wind_speed[0].innerHTML=responseData.days[0].windspeed+" KMPH";
        const humidity = document.getElementsByClassName("humidityPercentage");
        humidity[0].innerHTML=responseData.days[0].humidity+"%";
        const city = document.getElementsByClassName("location");
        city[0].innerHTML=responseData.address;
        let iconDescription= responseData.days[0].icon;
        if(iconDescription.includes("cloudy"))
        {
            setWeatherIcon(cloud_icon);
        }
        if(iconDescription.includes("snow"))
        {
            setWeatherIcon(snow_icon);
        }
        if(iconDescription.includes("rain"))
        {
            setWeatherIcon(rain_icon);
        }
        if(iconDescription.includes("wind"))
        {
            setWeatherIcon(wind_icon);
        }
        if(iconDescription.includes("clear"))
        {
            setWeatherIcon(clear_icon);
        }

       console.log(iconDescription);
    }
    return (
        <div className='container'>
            <div className="topBar">
                <input type="text" className="cityName" placeholder='Search Here' />
                <div className="searchIcon" onClick={() => { search() }}>
                    <img src={search_icon} alt={message}/>
                </div>
            </div>
            <div className="weatherIcon">
                <img src={weatherIcon} alt="" />
            </div>
            <div className="temperature">29°C</div>
            <div className="location">Mumbai</div>
            <div className="dataContainer">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidityPercentage">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
            </div>
            <div className="dataContainer">
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="windSpeed">10 KMPH</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp
