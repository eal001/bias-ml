const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const puppeteer = require('puppeteer');
const {PredictionServiceClient} = require('@google-cloud/automl').v1;
require("dotenv").config();
const { FIREBASE_CREDENTIALS,  WEBSITE_URL, GC_PROJECT_ID, GC_COMPUTE_LOCATION, GC_NETWORK_MODEL_ID} = require('./constants');

const firebaseConfig = FIREBASE_CREDENTIALS;

admin.initializeApp();

exports.retrieveHTMLContent = functions.https.onRequest( (req, res) => {
    const URL = req.query.url;
    
    return cors(req, res, async () => {
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
        return res.status(200).send({htmlContent: pageContent});
    });
});

exports.predict = functions.https.onRequest(async (request , response) => {

    const content = request.query.content;
    const client = new PredictionServiceClient();
    console.log("got content: " + content);
    console.log("note: b/c data types do not match up, dummy data has been substituted currently")
    //construct the request
    content = "i listened to kanyes new album today!";
    console.log("dummy content: "+content);
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
    //console.log(response);
    // for(const annotationPayload of response.payload){
    //     console.log(`Predicted class name: ${annotationPayload.displayName}`);
    //     console.log(`     Predicted score: ${annotationPayload.classification.score} `);
    // }
    // console.log("finished")

    return res.status(200).send({sentenceScores: google_response})

});