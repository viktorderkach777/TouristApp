
export default class FakeService {
    weather = {
        cityDay : "Thursday",
        cityName: "Rivne",
        country: "UA",
        tiles: [
            {
                calendDay: 5,
                calendMonth: "September",
                day: "Thursday",
                hour: 0,
                humidity: 81,
                icon: "https://openweathermap.org/img/w/01n.png",
                pressure: 764,
                tempMax: 12,
                tempMin: 11,
                weatherDescription: "clear sky",
                wind: 0
            },
            {
                calendDay: 6,
                calendMonth: "September",
                day: "Wednesday",
                hour: 15,
                humidity: 64,
                icon: "https://openweathermap.org/img/w/01d.png",
                pressure: 763,
                tempMax: 22,
                tempMin: 10,
                weatherDescription: "clear sky",
                wind: 2
            }
        ]
    }
   

    getTiles= async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
              resolve(this.weather)
            }, 700);
          });
        // console.log('weather', weather)
        // return weather;
    }
}
