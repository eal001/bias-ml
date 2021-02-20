import React from 'react';

class HowItWorks extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <p className='text-title'>How The Application Works</p>
                <p className='text-body'>
                    When you click 'Analyze', our app starts by using Google Firebase Cloud Functions to extract the HTML from the website 
                    at the provided URL. The raw HTML is sent back to our site, which then parses the text into sentences. These sentences are 
                    sent to our Google Cloud AutoML model that scores each sentence on a political ideology scale from left to right. These scores 
                    are sent back to our site and are presented using ChartJS.
                </p>
            </div>
        )
    }
}

export default HowItWorks;