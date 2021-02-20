const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const puppeteer = require('puppeteer');
const { FIREBASE_CREDENTIALS,  WEBSITE_URL} = require('./constants');

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