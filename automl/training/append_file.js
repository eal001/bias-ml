const constants = require("./constants");
const fs = require("fs");
const tokenizer = require("sbd");
//const { constants } = require("./Constants.js");
//read each file from its location, its contents are storeed in data

console.log("running append file script")

fs.readFile(constants.INPUT_LOC_FILE, 'utf8', function(err, data){
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
    sentences.map((sentence , index)=> {

        /**LIMIT the amount of lines that get appended PER FILE*/
        if(index < constants.LOOP_LIMITER_FILE){
            let edited_sentence = "";
            //edit the sentence (remove , and ")
            for(let i = 0; i < sentence.length ; i++){
                if(sentence[i] == "," || sentence[i] == "\""){
                    //do nothing to the new string
                } else {
                    edited_sentence += sentence[i];
                }
            }

            edited_sentence = edited_sentence.substr(2,edited_sentence.length)
            //append the edited sentence as a new line for the text
            text_in_sentences += edited_sentence + "," + constants.CLASSIFICATION +"\n";
        }
    })

    //take the new list of sentences and append it to the output file
    fs.appendFile(constants.OUTPUT_LOC, text_in_sentences, 'utf8', function(err){
        if(err) throw err;
        console.log("contents of " + constants.INPUT_LOC_FILE + " appended to " + constants.OUTPUT_LOC);
    })

})