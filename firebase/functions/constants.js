exports.FIREBASE_CREDENTIALS = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

exports.WEBSITE_URL = 'http://localhost:3000';

exports.GC_PROJECT_ID = process.env.GC_PROJECT_ID;
exports.GC_COMPUTE_LOCATION = process.env.GC_COMPUTE_LOCATION;
exports.GC_NETWORK_MODEL_ID = process.env.GC_NETWORK_MODEL_ID;
exports.GOOGLE_APPLICATION_CREDENTIALS = './credentials.json';