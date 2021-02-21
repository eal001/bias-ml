import React from "react";
import tokenizer from "sbd";

/**
 * quick helper class
 */
class ReplaceNewlineWithBreak extends React.Component {
    
    constructor(props) {
        super();
    }
    
    render() {
        let optional_options = {
            "newline_boundaries": true
        };
        let sentences = tokenizer.sentences(this.props.text);
        console.log(this.props.text);

        sentences.map(sentence =>{
            sentence += "<br />"
        })
        //console.log(sentences);
        let len = 0;
        return (<p>{
            sentences.map( (sentence, index) => {
                len += sentence.length
                if(len > 400){
                    return(<></>);
                }
                return(<p key={index} >{sentence} <br /> </p>);

        })}</p>);
    }
}

export default ReplaceNewlineWithBreak;