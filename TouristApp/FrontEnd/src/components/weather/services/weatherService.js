import axios from "axios";

export default class WeatherService {   

    _apiBase = 'https://api.openweathermap.org/data/2.5/forecast';

    _fetchData = async (region = 'Rivne') => {
        const { latitude, longitude } = region || {};
        const getDataByCity = `${this._apiBase}?q=${region}&units=metric&appid=${process.env.REACT_APP_WEATHER_ID}`;
        const getDataByCoords = `${this._apiBase}?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_WEATHER_ID}`;
        let location = typeof (region) === "object" ? getDataByCoords : getDataByCity;

        return await axios.get(location);
    };

    _avgArr = (arr) => {
        return Math.round(arr.reduce((curr, next) => curr + next) / arr.length);
    };

    _getInfo = (data, min = [], max = [], humidity = [], windSpeed = [], pressure = [], dataTime = []) => {
        data.map(item => {
            max.push(item.main.temp_max);
            min.push(item.main.temp_min);
            humidity.push(item.main.humidity);
            windSpeed.push(item.wind.speed);
            pressure.push(item.main.pressure);

            dataTime.push({
                hour: this._getHour(item.dt * 1000),
                calendDay: this._getDate(item.dt * 1000),
                calendMonth: this._getMonth(item.dt * 1000),
                icon: item.weather[0].icon,
                description: item.weather[0].description
            });
            return data;
        });

        const minMax = {
            min: Math.round(Math.min(...min)),
            max: Math.round(Math.max(...max)),
        };

        const avgHumdity = this._avgArr(humidity);
        const avgWindSpeed = this._avgArr(windSpeed);
        const avgPressure = this._avgArr(pressure);
        const weatherData = dataTime.length > 7 ? dataTime[4] : dataTime[0];

        return (
            {
                tempMax: minMax.max,
                tempMin: minMax.min,
                humidity: avgHumdity,
                wind: avgWindSpeed,
                pressure: Math.round(avgPressure * 0.75),
                day: this._getDayInfo(data),
                weatherDescription: weatherData.description,
                hour: weatherData.hour,
                calendDay: weatherData.calendDay,
                calendMonth: this._getMonthInfo(weatherData.calendMonth),
                icon: `https://openweathermap.org/img/w/${weatherData.icon}.png`
            }
        );
    };

    _groupByDays = data => {
        //console.log("_groupByDays-data", data);
        return (data.reduce((list, item) => {
            //console.log("item.dt_txt", item.dt_txt);
            const forecastDate = item.dt_txt.substr(0, 10);
            list[forecastDate] = list[forecastDate] || [];
            //console.log("list[forecastDate]", list[forecastDate]);
            //console.log("list[forecastDate]-item", item);
            list[forecastDate].push(item);

            return list;
        }, {}));
    };

    // Returns week of the day
    _getDayInfo = data => {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
    };

    _getMonthInfo = data => {
        const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        return monthsOfYear[data];
    };

    _getIcon = data => `https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;
    _getHour = time => time ? new Date(time).getHours() : new Date().getHours();
    _getDate = date => date ? new Date(date).getDate() : new Date().getDate();
    _getMonth = date => date ? new Date(date).getMonth() : new Date().getMonth();

    _getResources = async () => {
        const weather = await this._fetchData()
            .then((body) => {
                // console.log("res", body);               
                if (body.ok) {
                    throw new Error(`Could not fetch, received ${body.status}`);
                }

                const tilesValues = Object.values(this._groupByDays(body.data.list));
                //console.log("tilesValues", tilesValues);
                const forecastTiles = tilesValues.length > 5 ? tilesValues.slice(0, 5) : tilesValues;
                // console.log("forecastTiles", forecastTiles);                
                const tiles = forecastTiles.reduce((list, element) => {
                    let item = this._getInfo(element);
                    list.push(item);
                    return (
                        list
                    )
                }, []);

                const weather = {
                    cityName: body.data.city.name,
                    country: body.data.city.country,
                    cityDay: tiles[0].day,
                    tiles: tiles
                }
                //console.log("weather", weather);
                return weather;
            });

        return weather;
    }

    getTiles = async () => {
        const weather = await this._getResources();
       
        return weather;
    }   
}