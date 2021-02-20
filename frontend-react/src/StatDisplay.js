import React from "react";
import Charts from "react-chartjs-2";
import tokenizer from "sbd";

class StatDisplay extends React.Component {

    constructor(props) {
        super();
    }

    render() {
<<<<<<< HEAD
        return ( 
=======
        console.log(this.props.content);

        return (
>>>>>>> cd135ab9d536164d858b561832003c17c863bbce
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