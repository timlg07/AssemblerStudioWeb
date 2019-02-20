//Number.MAX_SAFE_INTEGER/*9 Billiarden*/

var $console;

function main(){
    
    // global console object
    $console = new Console();
    
    // only-automatic-interaction
    document.querySelectorAll(".oai").forEach(
        o=>o.addEventListener('click',e=>{
            e.preventDefault();
            $console.log("This is reserved for automatic interaction only","orange");
        })
    );
    
}