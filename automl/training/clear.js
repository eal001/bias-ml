const constants = require("./constants.js")
const fs = require("fs");

fs.writeFile(constants.OUTPUT_LOC, "", 'utf8', function(err){
    if(err) throw err;
    console.log("wiped contents of " + constants.OUTPUT_LOC);
})