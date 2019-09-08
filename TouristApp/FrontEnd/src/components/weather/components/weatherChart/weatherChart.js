import React, { Component } from "react";
import Chart from "react-apexcharts";

class WeatherChart extends Component {
    render() {

        const {
            tiles            
        } = this.props;       

        const cat = tiles.map((el) => {
            return el.day.substr(0, 3);
        });

        const max = tiles.map((el) => {
            return el.tempMax;
        });

        const min = tiles.map((el) => {
            return el.tempMin;
        });

        const options = {
            xaxis: {
                name: 'day',
                categories: cat
            }
        };

        const series = [{
            name: 'max temperature',
            data: max
        }, {
            name: 'min temperature',
            data: min
        }];

        // console.log("chart-props", this.props);
        // console.log("cat", cat)
        // console.log("max", max)
        // console.log("min", min)
        return (
            // <div className="area" >
                <Chart options={options}
                    series={series}
                    type="area"
                    width="350" />
            // </div>
        );
    }
}

export default WeatherChart;