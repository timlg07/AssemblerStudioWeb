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

function readFile( file ){
    
    let reader = new FileReader();
    reader.onload = function( evt ){
        import_( evt.target.result );
    };
    reader.readAsText(file);
    
}


function import_( text ){
    $console.log( text );
}
