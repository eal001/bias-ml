import React from "react";
import StatDisplay from "./StatDisplay.js";
import {extract, removeWhitespace, parseSentences, parseSentencesArray, removeCommas} from "./analyze.js";
import {SCORE_CATEGORY_1, SCORE_CATEGORY_2} from "./constants.js"

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
            },
            articleTitle: 'ARTICLE PREVIEW',
            previewBody: 'A preview of the article will appear here.',
            analysisTextBody: "A description of the article's score will appear here."
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }
    /**
     * we will update the url state every time the text is changed
     * @param {javascript object} event the event where the url is changed
     */
    handleTextChange(event) {
        this.setState({
            url: event.target.value
        });
    }

    /**
     * The post request for the HTML from a link will be handled here
     */
    async handleSubmit(event) {

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

        //console.log(this.state.url);
        //POST REQUEST FOR HTML 
        let resH = await fetch('http://localhost:5001/biasml/us-central1/retrieveHTMLContent?url=' + this.state.url, {method: 'POST'});
        await resH.json().then(data => {
            console.log("recieved html data")
            //console.log(data);
            let text = parseHTML(data);
            let text_arr = parseHTMLArray(data);
            this.setState({
                websiteContent: text,
                websiteSentencesArray: text_arr
            });
                
        }).catch(error => console.log(error));

        console.log(this.state.websiteSentencesArray);
        //POST REQUEST FOR GOOGLE NATURAL LANGUAGE ML
        let resA = await fetch("http://localhost:5001/biasml/us-central1/predict?content_array=" + this.state.websiteSentencesArray, {method: 'POST'});
        await resA.json().then(google_data => {
            console.log("recieved automl data");
            console.log(google_data);
            this.computeStats(google_data);
        }).catch(error => console.log(error));

        this.setState({
            url: ''
        });
    }

    /**
     * take all of the scores and evaluate statistics
     * @param {object} data google data returned from the automl call
     */
    computeStats(data){

        let total1 = 0;
        let total2 = 0;
        let sen_count = data.sentenceScores.length;

        data.sentenceScores.map( singleObject => {
            //console.log(singleObject);
            for(let i = 0; i < singleObject.payload.length; i++ ){
                const score = singleObject.payload[i];
                if(score.displayName == SCORE_CATEGORY_1){
                    total1 = score.classification.score;
                }
                if(score.displayName == SCORE_CATEGORY_2){
                    total2 = score.classification.score;
                }
            }
        })
        const score1 = total1/sen_count;
        const score2 = total2/sen_count;
        const avg = score1 - score2;

        const temp = {
            dem: score1,
            rep: score2,
            avg: avg,
        };

        this.setState({
            stats: temp
        });
    }
    
    render() {
        return (
            <div id='analysis'>
                <div id='input-cont'>
                    <div id='text-cont'>
                        <input id="urlEntry" type="text" placeholder={this.state.inputPlaceholder}  value={this.state.url} onChange={this.handleTextChange} />
                    </div>
                    <div id='button-cont'>
                        <button id="urlSubmit" onClick={this.handleSubmit}>ENTER</button>
                    </div>
                </div>
                <div id='bottom-part-cont'>
                    <div id='content-cont'>
                        <StatDisplay content={this.state.stats} />
                        <div id='preview-cont'>
                            <h1 className='content-text-title'>{this.state.articleTitle}</h1>
                            <p className='content-text-body'>{this.state.previewBody}</p>
                        </div>
                    </div>
                    <div id='analysis-cont'>
                        <h1 className='content-text-title'>DETAILED ANALYSIS</h1>
                        <p className='content-text-body'>{this.state.analysisTextBody}</p>
                    </div>
                </div>
            </div>
        )
    }

}

/**
 * function that takes the raw HTML and posts it to google AutoML
 */

 const parseHTML = (raw) => {

    //console.log("parsing the html for text");
    let str = extract(raw.htmlContent);
    //console.log({str});
    str = removeWhitespace(str);
    //console.log({str});
    str = parseSentences(str);
    return str;
 }

 const parseHTMLArray = (raw) => {
    //console.log("parsing the html for array");
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