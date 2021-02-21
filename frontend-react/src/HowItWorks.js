import React from 'react';

class HowItWorks extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <p className='text-title'>HOW THIS TOOL WORKS</p>
                <br/>
                <p className='text-body'>
                    The frontend of our app was built using ReactJS. When a URL is submitted to the site, it sends that URL
                    to a Google Firebase function that uses the Puppeteer Node JS module to extract the raw HTML content. The 
                    raw content is then parsed into sentences and sent to our Google Cloud AutoML model, which scores the text 
                    on conservative and liberal bias. This data is sent back to our site, and the results are displayed using 
                    the React-compatible version of ChartJS.
                    <br/>
                    <br/>
                    Disclaimer: this site in now way determines whether or not the content of the article is true, we are 
                    simply attempting to reveal bias in the author's diction.
                </p>
            </div>
        )
    }
}

export default HowItWorks;