import React from "react";
import { Bar } from "react-chartjs-2";
import tokenizer from "sbd";
import {SCORE_CATEGORY_1, SCORE_CATEGORY_2} from "./constants"

function StatDisplay(props) {
    console.log('constructed stats');
    console.log(props);

    const data = {
        labels: [SCORE_CATEGORY_1, SCORE_CATEGORY_2],
        datasets: [{
            label: 'Bias',
            data: [props.content.s1, props.content.s2],
            backgroundColor: [
                'rgba(165, 33, 45, 0.95)',
                'rgba(2, 12, 97, 0.95)'
            ],
            borderColor: 'white',
            borderWidth: 2
        }]
    };
    const options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 1,
                    padding: 10,
                    fontColor: 'white',
                    fontFamily: 'Helvetica'
                },
                gridLines: {
                    color: 'white',
                    zeroLineColor: 'white'
                }
            }],
            xAxes: [{
                ticks: {
                    padding: 10,
                    fontColor: 'white',
                    fontFamily: 'Helvetica',
                    fontSize: 20
                },
                gridLines: {
                    color: 'white',
                    zeroLineColor: 'white',
                    tickMarkLength: 0
                }
            }]
        },
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'BIAS ANALYTICS',
            fontFamily: 'Helvetica',
            fontSize: 25,
            fontColor: 'white',
            fontStyle: 'normal',
            position: 'top'
        },
        tooltips: {
            titleFontFamily: 'Helvetica',
            bodyFontFamily: 'Helvetica',
            cornerRadius: 2
        }
    };

    return (
        <div id='stat-display'>
            <Bar
                data={data}
                options={options}
            />
        </div>
    );

}

export default StatDisplay;