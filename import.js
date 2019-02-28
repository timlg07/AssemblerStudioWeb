// (@param {Event} Gets passed by the listener)
function handleFileSelect( evt ){
    
    var file  = evt.target.files[0];
    if( file ){
        if( file.type.match( "text/plain" )){
            readFile( file );
        } else {
            $console.log( "The file has to be a plain text file.","red" );
        }
    } else {
        $console.log( "No file selected.","orange" );
    }
    
}    

// @param {File} The file which should be loaded
function readFile( file ){
    
    let reader = new FileReader();
    reader.onload = function( evt ){
        import_( evt.target.result,file.name );
    };
    reader.readAsText(file);
    
}

// @param {String} The text of the text file with all values
function import_( text,name ){
    
    let new_cells = text.split( /[\r\n ]+/ ).filter(v=>v!="");
    while( $storage.speicherZellen.length < new_cells ){
        $storage.createTableRow();
    }
    $storage.speicher = new_cells.map(v=>(v==0?"":v));
    $console.log( `Imported ${encodeURI(name)}`,"#64DD17" );
}
