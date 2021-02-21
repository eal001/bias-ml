import React from "react";
import StatDisplay from "./StatDisplay.js";
import {extract, removeWhitespace, parseSentences, parseSentencesArray, removeCommas} from "./analyze.js";

/**
 * This file will be to contain all of the components that exist within the body
 * It will process the information contained within the URL, post to firebase, and
 * display the info that it recieves
 * It will then take that info and post to google AutoML and get the resulting numbers
 */

 /**
  * container class for all of the info components
  */
class Analysis extends React.Component {

    constructor() {
        super();
        this.state = {
            url: "",
            websiteContent: 'Stat Display',
            websiteSentencesArray: [],
            inputPlaceholder: 'Enter URL Here',
            stats: {
                max: 0,
                min: 0,
                ave: 0,
                sdev: 0,
                med: 0
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleAnalyze = this.handleAnalyze.bind(this);
    }
    /**
     * we will update the url state every time the text is changed
     * @param {javascript object} event the event where the url is changed
     */
    handleTextChange(event) {

        this.setState({
            url: event.target.value
        })
        
    }

    /**
     * The post request for the HTML from a link will be handled here
     */
    handleSubmit(event) {

        //post request

        //Add error catching for invalid urls

        if (this.state.url === '') {
            this.setState({
                inputPlaceholder: 'Please enter a valid URL'
            });

            setTimeout(() => {
                this.setState({
                    inputPlaceholder: 'Enter URL here'
                });
            }, 1000);

            return;
        }

        this.setState({
            url: ''
        });
        //http://localhost:5001/biasml/us-central1/predict?content= "content equlas" FOR OTHER FIREBASE FUNCT
        fetch('http://localhost:5001/biasml/us-central1/retrieveHTMLContent?url=' + this.state.url, {method: 'POST'})
            .then(res => res.json())
            .then(data => {
                console.log("firebase server response data")
                //console.log(data);
                let text = parseHTML(data);
                let text_arr = parseHTMLArray(data);
                this.setState({
                    websiteContent: text,
                    websiteSentencesArray: text_arr
                });
                
            })
            .catch(error => console.log(error));

        const n = (Math.random() * 2)-1;
        const s = (Math.random() * 2)-1;
        const temp = {
            min: -0.99,
            max: 0.99,
            ave: n,
            sdev: s,
            med: n-0.2
        }
        this.setState({
            state : temp
        })
        
    }

    handleAnalyze(){
        //analyze whatever contents that we just got from the backend!
        // this.state.websiteSentencesArray.map( sent => {
        //     console.log(sent);
        // });
        fetch("http://localhost:5001/biasml/us-central1/predict?content_array=" + this.state.websiteSentencesArray, {method: 'POST'})
            .then(res => res.json())
            .then(google_data => {
                console.log(google_data);
            })
            .catch(error => console.log(error));
        //this.state.websiteSentencesArray.map( sentence => predict(sentence) )
    }
    
    render() {

        //console.log("rendering analysis page");
        //console.log(this.state.websiteContent);
        return (
            <div id='analysis'>
                <input id="urlEntry" type="text" placeholder={this.state.inputPlaceholder}  value={this.state.url} onChange={this.handleTextChange} />
                <button id="urlSubmit" onClick={this.handleSubmit}> G E T C O N T E N T </button>
                <button id="temp" onClick={this.handleAnalyze}>TEMP-ANALYZE</button>
                <StatDisplay content={this.state.websiteContent} />
            </div>
        )
    }

}

/**
 * function that takes the raw HTML and posts it to google AutoML
 */

 const parseHTML = (raw) => {

    console.log("parsing the html for text");
    let str = extract(raw.htmlContent);
    //console.log({str});
    str = removeWhitespace(str);
    //console.log({str});
    str = parseSentences(str);
    return str;
 }

 const parseHTMLArray = (raw) => {
    console.log("parsing the html for array");
    let str = extract(raw.htmlContent);
    console.log({str});
    str = removeCommas(str);
    console.log(str)
    str = removeWhitespace(str);
    //console.log({str});
    const arr = parseSentencesArray(str);
    return arr;
 }

/**
 * function that takes the raw google score and computes some statistics
 */


//export as a component 
export default Analysis;