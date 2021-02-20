const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors');
const puppeteer = require('puppeteer');
const { FIREBASE_CREDENTIALS,  WEBSITE_URL} = require('./constants');

const firebaseConfig = FIREBASE_CREDENTIALS;

admin.initializeApp();

exports.analyzeWebpage = functions.https.onRequest( (req, res) => {
    return cors(req, res, async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // possibly change this to networkidle0
        await page.goto(req.query.url, {waitUntil: 'domcontentloaded'});
        const pageContent = await page.content;
        res.setHeader('Access-Control-Allow-Origin', WEBSITE_URL);
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        return res.status(200).send({htmlContent: output});
    });
});