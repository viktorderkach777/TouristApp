import React, { Component } from "react";
import Chart from "react-apexcharts";

class DayChart extends Component {  

    render() {
        const {
            temps            
        } = this.props;       

        console.log("dayTemp-temps", temps);

        const temperature = temps.map((el) => {
            return el.temp;
        });

        console.log("temperature", temperature);

        const hours = temps.map((el) => {
            return el.hour;
        });

        console.log("hours", hours);

        const options = {
            stroke: {
                curve: 'smooth'
            },
            markers: {
                size: 0
            },
            xaxis: {
                name: 'hour',
                categories: hours
            }
        };
        const series = [{
            name: 'temperature',
            data: temperature
        }];

        return (
            <div className="area">
                <Chart options={options}
                    series={series}
                    type="area"
                    width="350" />
            </div>
        );
    }
}

export default DayChart;