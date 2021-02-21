import React from "react";
import StatDisplay from "./StatDisplay.js";
<<<<<<< HEAD
import { extract, removeWhitespace, parseSentences, parseSentencesArray } from "./analyze.js";
=======
import {extract, removeWhitespace, parseSentences, parseSentencesArray, removeCommas} from "./analyze.js";
>>>>>>> 6f5a4ce0e126ba425d97c1ad3f513a1ee9b72ccb

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
                avg: 0,
                sdev: 0,
                med: 0,
                rep: 0,
                dem: 0,
                prevTitle: '',
                prevBody: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
<<<<<<< HEAD
        this.handleAnalyze = this.handleAnalyze.bind(this);

        console.log(this.state.stats);
=======
>>>>>>> 6f5a4ce0e126ba425d97c1ad3f513a1ee9b72ccb
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

        //http://localhost:5001/biasml/us-central1/predict?content= "content equlas" FOR OTHER FIREBASE FUNCTION

        // fetch('http://localhost:5001/biasml/us-central1/retrieveHTMLContent?url=' + this.state.url, {method: 'POST'})
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log("firebase server response data")
        //         let text = parseHTML(data);
        //         let text_arr = parseSentencesArray(data.htmlContent);
        //         this.setState({
        //             websiteContent: text,
        //             websiteSentencesArray: text_arr
        //         });
                
        //     })
        //     .catch(error => console.log(error));

        fetch("http://localhost:5001/biasml/us-central1/predict?content_array=" + this.state.websiteSentencesArray, {method: 'POST'})
            .then(res => res.json())
            .then(google_data => {
                console.log(google_data);
                computeStats(google_data);
                
            })
            .catch(error => console.log(error));
        
    }

    /**
     * take all of the scores and evaluate statistics
     * @param {object} data google data returned from the automl call
     */
    computeStats(data){
        const n = (Math.random() * 2)-1;
        const s = (Math.random() * 2)-1;
        const temp = {
            min: -0.99,
            max: 0.99,
            avg: n,
            sdev: s,
            med: n - 0.2,
            dem: d,
            rep: r,
            prevBody: 'First 400 Characters',
            prevTitle: 'Preview Title'
        };

        this.setState({
            state : temp
        })
    }
    
    render() {
        return (
            <div id='analysis'>
                <div id='input-cont'>
                    <p id='prompt-text'>URL :</p>
                    <div id='text-cont'>
                        <input id="urlEntry" type="text" placeholder={this.state.inputPlaceholder}  value={this.state.url} onChange={this.handleTextChange} />
                    </div>
                    <div id='button-cont'>
                        <button id="urlSubmit" onClick={this.handleSubmit}>Enter</button>
                    </div>
                </div>
                <div id='content-cont'>
                    <StatDisplay content={this.state.stats} />
                    <div id='preview-cont'>
                        <h1>Preview Title</h1>
                        <p>First 400 characters</p>
                    </div>
                </div>
                <div id='analysis-cont'>
                    <h1>Detailed Analysis</h1>
                    <p>This article is biased or maybe it's not idk</p>
                </div>
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