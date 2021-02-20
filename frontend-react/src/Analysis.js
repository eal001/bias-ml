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
    }
    
    render() {

        return (

            <div>
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