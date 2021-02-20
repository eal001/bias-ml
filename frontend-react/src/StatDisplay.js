import React from "react";
import Charts from "react-chartjs-2";
import tokenizer from "sbd";

class StatDisplay extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        return ( 
            <div>
                <ReplaceNewlineWithBreak text={this.props.content}/>
            </div>
        );
    }

}


class ReplaceNewlineWithBreak extends React.Component {
    
    constructor(props){
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
        console.log(sentences);
        return (<>{
            sentences.map( sentence => {
                return(<h3>{sentence} <br /> </h3>)
        })}</>)
    }
}

export default StatDisplay;