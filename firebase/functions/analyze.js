const tokenizer = require("sbd");

/**
 * 
 * @param content html content for the algorithm to analyze
 */
exports.extract = function (content) {

    //console.log("running extract")
    let isInsideTag = false;
    let shouldAddChar = false;
    let isInsideScriptTag = false;
    let isInsideStyleTag = false;
    let isTagNameResolved = false;
    let inTitle = false;
    let titleComplete = false;
    
    let lastChar = '';
    let tagName = '';
    let textContent = '';
    let title = "";

    for (let i = 0; i < content.length; i++) {
        const currentChar = content[i];

        if (isInsideTag && !isTagNameResolved) {
            tagName = '';
            let tempCurrentChar = currentChar;
            let j = i;
            while (tempCurrentChar !== '>' && tempCurrentChar !== ' ') {
                tagName += tempCurrentChar;
                j++;
                tempCurrentChar = content[j];
            }

            //i = j;

            isTagNameResolved = true;
            if (isInsideScriptTag && tagName === '/script') {
                isInsideScriptTag = false;
            } if (tagName === 'script') {
                isInsideScriptTag = true;
            }
            isInsideStyleTag = (tagName === 'style');
            textContent += ' ';

            if(tagName === "h1" || tagName === "h" || tagName === "h2" || tagName === "h3"){
                inTitle = true
            }
            //console.log(tagName);
        }

        if (currentChar === '<') {
            isTagNameResolved = false;
            isInsideTag = true;
            lastChar = currentChar;
            if(inTitle){
                titleComplete = true;
            }
        } if (currentChar === '>') {
            isInsideTag = false;
            lastChar = currentChar;
            continue;
        }

        shouldAddChar = !(isInsideTag || isInsideScriptTag || isInsideStyleTag || currentChar === '\n' || currentChar === '\t');

        if (shouldAddChar) {
            textContent += currentChar;

            if(inTitle && !titleComplete){
                title += currentChar
            }
        }
        
        //console.log(textContent);

        lastChar = currentChar;
        
    }
    
    //this can be removed once lastchar is used in this code
    console.log(title);
    
    return {title: title, body: textContent};
}

exports.removeWhitespace = function (text) {
    //console.log("running whitespace")
    let output = '';
    let prevChar;
    let currentChar;

    for (let i = 0; i < text.length; i++) {
        let shouldAddChar = true;
        currentChar = text[i];

        if (prevChar === ' ' && currentChar === ' ') {
            shouldAddChar = false;
        }

        if (shouldAddChar) {
            output += currentChar;
        }
        prevChar = currentChar;
    }

    return output;
}

exports.parseSentences = function (text) {
    //console.log("sentences parsing!")
    // let optional_options = {
    //     "newline_boundaries": true
    // }; can add this to the tokenizer usage params
    let sentences = tokenizer.sentences(text);
    let text_in_sentences = "";

    //console.log(sentences);

    sentences.map(sentence => {
        text_in_sentences += sentence + "\n";
    })

    //console.log(text_in_sentences);
    return text_in_sentences;
}

exports.parseSentencesArray = function (text){
    const sentences = tokenizer.sentences(text);
    //console.log("inside parse sentences");
    //console.log(sentences);
    //console.log(["one", "2", "three", "four", "5"]);
    return sentences;
}

exports.removeCommas = function (text){
    for (const c in text) {
        if ( c == ',') {
            c = ' ';
        }
    }
    return text;
}

