# bias-ml #
remember to change credentials.json content and the .env file content when 
switching to political bias bot

## Research Articles and References ##
These articles were used in the information gathering process
https://arxiv.org/pdf/2006.03051.pdf
https://arxiv.org/abs/1810.12897
https://arxiv.org/pdf/1810.12897.pdf

## Inspiration

## What it does
Our application is a website and google firebase program that takes another web article's URL and parses its sentences for political bias.

## How we built it
The frontend of our app was built using ReactJS. When a URL is submitted to the site, it sends that URL
to a Google Firebase function that uses the Puppeteer Node JS module to extract the raw HTML content. The raw content is then parsed into sentences and sent to our Google Cloud AutoML model, which scores the text on conservative and liberal bias. This data is sent back to our site, and the results are displayed using the React-compatible version of ChartJS.

## Challenges we ran into
Our biggest frustrations came from trying to learn the Google Firebase and Google Cloud APIs. We had never worked with either of these APIs so there was a lot to learn in just a few days. Training the NLP model also took much longer than we had anticipated. In addition, finding the right data to train the bot was difficult, and parsing the dataset for bad entries and duplicates was also a grueling process. Using Google Firebase HTTP functions caused issues since we had to find a workaround for CORS restrictions. Parsing raw HTML into strictly the article content also posed a significant challenge. 

## Accomplishments that we're proud of
We are proud of designing a sleek yet interactive interface.
We are proud of building a firebase backend that works in tandem with our frontend
We are proud of training our first neural network

## What we learned
Group Programming
Frontend
Backend 
ReactJS
ChartsJS
Google-Firebase
Google-Cloud-APIs
Google-AutoML
Node.js
UX/UI Design

## What's next for bias-ml
We plan to retrain our neural network on a more varied dataset that is better parsed and edited for the task at hand. We would like to deploy the website to a hosting service without error. In addition, we would like to create and use a sentiment detection model that can help decide whether the subjects in the sentence are viewed positively or negatively. We would also like to create a google chrome extension that can be downloaded from our webpage.
