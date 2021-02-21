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
        //return res.status(200).send({htmlContent: pageContent});
        
        //PARSE HTML FOR SENTENCES
        
        console.log("parsing html");
        let str = extract(pageContent);
        str = removeWhitespace(str);
        const previewText = parseSentences(str) // THIS IS SAVED FOR LATER
        console.log("created preview");
        str = removeCommas(str);
        const content_array = parseSentencesArray(str);
        console.log("created natural language query");

        //NOW TAKE SENTENCES AND SEND TO AUTOML
        const client = new PredictionServiceClient();
        let final_response = [];
        //console.log("got content: " + content_array);
        //console.log(typeof content_array);
        //console.log("note: b/c data types do not match up, dummy data has been substituted currently")
        //construct the request
        console.log("posting query");
        //console.log(content_array);
        
        for(let i = 0; i < content_array.length; i++){
            let content = content_array[i];
            //console.log("true sentence:" + content);
            //content = "i listened to kanyes new album today!";
            //console.log("dummy content: "+content);
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
            //final_response.push(google_response);
        }
        console.log("analysis complete");
        console.log("sentences analyzed: "+content_array.length);
        console.log("returning a response");
        // console.log("total resp")
        // console.log(final_response)
        // console.log("the final Response 1")
        // console.log(final_response[0]);
        // console.log("the final Response 2")
        // console.log(final_response[1]);
        // console.log("the final Response 3")
        // console.log(final_response[2]);

        return res.status(200).send({previewText: previewText, sentenceScores: final_response})
    });
});

exports.predict = functions.https.onRequest( async (req , res) => {

    const str = req.query.content_array;
    let sentence = "";
    let content_array = [];
    console.log(str);

    for (let i = 0 ; i < str.length ; i++) {
        
        if (str[i] == ',') {
            content_array.push(sentence);
            sentence = "";
        }
        sentence += str[i];
    }
    content_array.push(sentence);
    console.log(content_array);
    let final_response = [];
    
    return cors(req, res, async () => {
        const client = new PredictionServiceClient();
        //console.log("got content: " + content_array);
        //console.log(typeof content_array);
        //console.log("note: b/c data types do not match up, dummy data has been substituted currently")
        //construct the request
        for(let i = 0; i < content_array.length; i++){
            let content = content_array[i];
            //console.log("true sentence:" + content);
            //content = "i listened to kanyes new album today!";
            //console.log("dummy content: "+content);
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
            //final_response.push(google_response);

        }

        // console.log("total resp")
        // console.log(final_response)
        // console.log("the final Response 1")
        // console.log(final_response[0]);
        // console.log("the final Response 2")
        // console.log(final_response[1]);
        // console.log("the final Response 3")
        // console.log(final_response[2]);

        return res.status(200).send({sentenceScores: final_response})
    });

});