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
class Analysis extends React.Component{

    constructor() {
        super();
        this.state = {
            url: ""
        }
        this.handleClick = this.handleClick.bind();
        this.handleTextChange = this.handleClick.bind();
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
    handleSubmit(){

        //post request
    }
    
    render() {
        return (
            <div>
                <input id="urlEntry" type="text" placeholder="Enter URL Here" onClick={this.handleTextChange} />
                <button id="urlSubmit" onClick={this.handleClick} />
                Analysis
                <StatDisplay/>
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
export default Analysis