import React from "react";
import StatDisplay from "./StatDisplay.js";

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
            inputPlaceholder: 'Enter URL Here'
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

        fetch('http://localhost:5001/biasml/us-central1/retrieveHTMLContent?url=' + this.state.url, {method: 'POST'})
            .then(res => res.json())
            .then(data => {
                this.setState({
                    websiteContent: data.htmlContent
                });
            })
            .catch(error => console.log(error));
    }
    
    render() {
        return (
            <div id='analysis'>
                <input id="urlEntry" type="text" placeholder={this.state.inputPlaceholder}  value={this.state.url} onChange={this.handleTextChange} />
                <button id="urlSubmit" onClick={this.handleSubmit}>Analysis</button>
                <StatDisplay content={this.state.websiteContent} />
            </div>
        )
    }

}

/**
 * function that takes the input and posts it to google firebase
 */

/**
 * function that takes the raw HTML and posts it to google AutoML
 */

/**
 * function that takes the raw google score and computes some statistics
 */

//export as a component 
export default Analysis;