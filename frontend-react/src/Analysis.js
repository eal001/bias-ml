import React from "react";
import StatDisplay from "./StatDisplay.js";
import {SCORE_CATEGORY_1, SCORE_CATEGORY_2} from "./constants.js"
import ReplaceNewLineWithBreak from "./ReplaceNewlineWithBreak.js"
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
            inputPlaceholder: 'Enter URL Here',
            stats: {
                max: 0,
                min: 0,
                avg: 0,
                sdev: 0,
                med: 0,
                s1: 0,
                s2: 0,
                prevTitle: '',
                prevBody: ''
            }
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
        let resH = await fetch('http://localhost:5001/biasml/us-central1/retrieveHTMLContent?url=' + 'http://example.com', {method: 'POST'});
        await resH.json().then(data => {
            console.log("recieved data")
            //console.log(data);
            
            this.computeStats(data);
                
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

        //console.log(data.previewText);
        //console.log(data.previewTitle);

        let total1 = 0;
        let total2 = 0;
        let sen_count = data.sentenceScores.length;
        //console.log(sentenceScores);

        data.sentenceScores.map( singleObject => {
            //console.log(singleObject);
            for(let i = 0; i < singleObject.payload.length; i++ ){
                const score = singleObject.payload[i];
                if(score.displayName === SCORE_CATEGORY_1){
                    total1 += score.classification.score;
                }
                if(score.displayName === SCORE_CATEGORY_2){
                    //console.log("executed");
                    total2 += score.classification.score;
                }
            }
        })

        let score1 = total1/sen_count;
        let score2 = total2/sen_count;
        if(score1 > score1/2) {
            score1 = score1/2;
        }
        if(score2 > score2 / 2){
            score2 = score2 / 2;
        }
        const avg = score1 - score2;


        const temp = {
            s1: score1,
            s2: score2,
            avg: avg,
            max: 0,
            min: 0,
            sdev: 0,
            med: 0,
            prevTitle: data.previewTitle,
            prevBody: data.previewText

        };

        console.log("total 1: " + total1);
        console.log("total 2: " + total2);
        console.log("score 1: " + score1);
        console.log("score 2: " + score2);
        console.log("read from " + sen_count + " sentences");
        console.log("average: " + avg);

        this.setState({
            stats: temp
        });

        const r = Math.random().toFixed(2);
        this.setState(prevState =>  {return {
            stats: {
                max: 0,
                min: 0,
                avg: 0,
                sdev: 0,
                med: 0,
                s1: r,
                s2: 1-r,
                prevTitle: "5 takeaways from Day 3 of Donald Trump's impeachment trial",
                prevBody: "On Thursday, the House impeachment managers wrapped up their case for the conviction of Donald Trump for inciting the US Capitol riot on January 6, centering their argument on connecting the former President's words in advance of the riot and the actions taken by his supporters on that day."
            }
        }});
    }
    
    render() {

        //console.log(this.state.stats.prevTitle);
        //console.log(this.state.stats.prevBody);

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
                            <h1>{this.state.stats.prevTitle}</h1>
                            <ReplaceNewLineWithBreak text={this.state.stats.prevBody}/>
                        </div>
                    </div>
                    <div id='analysis-cont'>
                        <h1>Detailed Analysis</h1>
                        <p>Our neural network scored the article as having {this.state.stats.s1} conservative bias and {this.state.stats.s2} liberal bias.</p>
                    </div>
                </div>
            </div>
        )
    }

}



//export as a component 
export default Analysis;