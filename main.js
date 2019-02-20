//Number.MAX_SAFE_INTEGER/*9 Billiarden*/

var $console, $storage, $machine;

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
    
}