var $console, $storage, $machine, $delay = 100;

function main(){
    
    $console = new Console();
    $storage = new Speicherwerk();
    $machine = new Registermaschine();
    
    // only-automatic-interaction
    document.querySelectorAll(".oai").forEach(
        o=>o.addEventListener('click',e=>{
            e.preventDefault();
            $console.log("This is reserved for automatic interaction only","orange");
        })
    );
    
    // import feature
    document.getElementById('files').addEventListener('change', handleFileSelect);
    
}