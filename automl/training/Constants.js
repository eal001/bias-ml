exports.INPUT_LOC_DIR = "../dataset/republican";
exports.INPUT_LOC_FILE = "../dataset/_conservative.txt";
exports.OUTPUT_LOC = "./training_labels_2.csv";
exports.CLASSIFICATION = "Republican"; // Democratic , Republican
exports.LOOP_LIMITER_DIR = 10000; //This will be used during testing to limit the amount of files parsed
exports.LOOP_LIMITER_FILE = 1500; //This will be used (EVEN IN EXECUTION) to limit the amount of lines taken per file