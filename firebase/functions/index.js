const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const puppeteer = require('puppeteer');
const {PredictionServiceClient} = require('@google-cloud/automl').v1;
require("dotenv").config();
const {extract, removeWhitespace, parseSentences, parseSentencesArray, removeCommas} = require("./analyze.js");
const { FIREBASE_CREDENTIALS,  WEBSITE_URL, GC_PROJECT_ID, GC_COMPUTE_LOCATION, GC_NETWORK_MODEL_ID} = require('./constants');

const firebaseConfig = FIREBASE_CREDENTIALS;

admin.initializeApp();

exports.retrieveHTMLContent = functions.https.onRequest( (req, res) => {
    const URL = req.query.url;
    
    return cors(req, res, async () => {
        
        //GET THE HTML

        const browser = await puppeteer.launch();
        console.log('launched');
        const page = await browser.newPage();
        console.log('page opened');
        // possibly change this to networkidle0
        await page.goto(URL, {waitUntil: 'domcontentloaded'});
        console.log('website loaded');
        const pageContent = await page.content();
        res.setHeader('Access-Control-Allow-Origin', WEBSITE_URL);
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        await browser.close();
        
        //PARSE HTML FOR SENTENCES
        
        console.log("parsing html");
        let {title, body}  = extract(pageContent);
        body = removeWhitespace(body);
        const previewText = parseSentences(body) // THIS IS SAVED FOR LATER
        const previewTitle = title; //THIS IS SAVED FOR LATER
        console.log("created preview");
        body = removeCommas(body);
        const content_array = parseSentencesArray(body);
        console.log("created natural language query");

        //NOW TAKE SENTENCES AND SEND TO AUTOML
        const client = new PredictionServiceClient();
        let final_response = [];
        
        console.log("posting query");
        
        for(let i = 0; i < content_array.length; i++){
            let content = content_array[i];
            
            const google_request = {
                name: client.modelPath(GC_PROJECT_ID, GC_COMPUTE_LOCATION, GC_NETWORK_MODEL_ID),
                payload: {
                    textSnippet : {
                        content: content,
                        mimeType: 'text/plain'
                    }
                }
            }
            const [google_response] = await client.predict(google_request);  
            final_response.push(google_response);
        }
        console.log("analysis complete");
        console.log("sentences analyzed: "+content_array.length);
        console.log("returning a response");

        return res.status(200).send({previewTitle: previewTitle, previewText: previewText, sentenceScores: final_response})
    });
});