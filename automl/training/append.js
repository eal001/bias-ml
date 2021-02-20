//a simple script that will return the sentences inside of an article
//it will also put into a 
const constants = require("./Constants.js");
const fs = require('fs');
const tokenizer = require('sbd');

const input_loc = constants.INPUT_LOC;
const output_loc = constants.OUTPUT_LOC;
const classification = constants.CLASSIFICATION;

let tempFileName = "";

//first get every file in the directory
fs.readdir(input_loc, 'utf8', function(err, files){
    if(err) throw err;
    
    /** IMPORTANT IF CHECK, SO THAT WE DONT LOOP 1000 FILES DURING TESTING */
    
    //for each file in the directory
    files.forEach( function(file, index) {

        if(index < constants.LOOP_LIMITER) {
        tempFileName = input_loc + "/" + file
        //read each file from its location, its contents are storeed in data
        if(file.substr(file.length-3, file.length) == "txt"){
        fs.readFile(tempFileName, 'utf8', function(err, data){
            if(err) throw err;

            //set boundaries for sentences in the data
            let optional_options = {
                "newline_boundaries": true
            };

            //data is text
            let text = data;
            //organize the data into sentences [an array]
            let sentences = tokenizer.sentences(text, optional_options);
            let text_in_sentences = "";

            //map each sentence to a line in the string
            sentences.map(sentence => {
        
                let edited_sentence = "";
                //edit the sentence (remove , and ")
                for(let i = 0; i < sentence.length ; i++){
                    if(sentence[i] == "," || sentence[i] == "\""){
                        //do nothing to the new string
                    } else {
                        edited_sentence += sentence[i];
                    }
                }

                //append the edited sentence as a new line for the text
                text_in_sentences += edited_sentence + "," + classification +"\n";
            })

            //take the new list of sentences and append it to the output file
            fs.appendFile(output_loc, text_in_sentences, 'utf8', function(err){
                if(err) throw err;
                console.log("contents of " + tempFileName + " appended to " + output_loc);
            })

        })
    } //closing bracket for checking for file type
    } //this is the closing if statement bracket
    })
})