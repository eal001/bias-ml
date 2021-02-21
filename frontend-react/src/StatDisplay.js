import React from "react";
import { Bar } from "react-chartjs-2";
import tokenizer from "sbd";

function StatDisplay(props) {
    console.log('constructed stats');
    console.log(props);

    const data = {
        labels: ['Right', 'Left'],
        datasets: [{
            label: 'Percentage of Bias',
            data: [props.content.dem, props.content.rep],
            backgroundColor: [
                'rgba(165, 33, 45, 0.8)',
                'rgba(2, 12, 97, 0.8)'
            ],
            borderColor: 'black',
            borderWitdh: 1
        }]
    };
    const options = {
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    max: 1
                }
            }],
            xAxes: []
        },
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Bias Analytics',
            fontFamily: 'Atkinson',
            fontSize: 30,
            fontColor: 'black'
        },
        tooltips: {
            titleFontFamily: 'Atkinson',
            bodyFontFamily: 'Atkinson'
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


class ReplaceNewlineWithBreak extends React.Component {
    
    constructor(props) {
        super();
    }
    
    render() {
        let optional_options = {
            "newline_boundaries": true
        };
        let sentences = tokenizer.sentences(this.props.text);
        

        sentences.map(sentence =>{
            sentence += "<br />"
        })
        //console.log(sentences);
        return (<p>{
            sentences.map( (sentence, index) => {
                return(<h3 key={index} >{sentence} <br /> </h3>)
        })}</p>);
    }
}

export default StatDisplay;