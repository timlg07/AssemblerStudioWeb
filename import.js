/**
 * Handles the selection of a file. When the file is a valid plain text file,
 * it gets imported.
 * 
 * @param {Event} evt The event gets passed by the listener
 */ 
function handleFileSelect( evt ){
    var file = evt.target.files[0];
    if (file) {
        if (file.type.match("text/plain")) {
            readFile(file);
        } else {
            $console.log("The file has to be a plain text file.", "red");
        }
    } else {
        $console.log("No file selected.", "orange");
    }
}

/**
 * Loads the content of the file and passes it to the import function.
 * 
 * @param {File} file The file which should be loaded
 */
function readFile(file){
    let reader = new FileReader();
    reader.onload = function(evt) {
        import_(evt.target.result, file.name);
    };
    reader.readAsText(file);
}

/** 
 * Interprets the given text and overwrites the storage with its content.
 * Writes a message to the $console when finished.
 * 
 * @param {String} text The text of the file containing all values.
 * @param {String} name The filename used in the log message.
 */
function import_(text, name) {
    let new_cells = text.split(/[\r\n ]+/).filter(v => v != "");
    while ($storage.speicherZellen.length < new_cells) {
        $storage.createTableRow();
    }
    $storage.content = new_cells.map(v => v == 0 ? "" : v);
    $console.log(`Imported ${encodeURI(name)}`, "#64DD17");
}
