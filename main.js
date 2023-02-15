var $console, $storage, $machine, $delay = 100;

/**
 * Initializes global variables, adds listeners, tooltips and a welcome message.
 */
function main() {
    $console = new Console();
    $storage = new Speicherwerk();
    $machine = new Registermaschine();

    // only-automatic-interaction
    document.querySelectorAll(".oai").forEach(
        o => o.addEventListener('click', e => {
            e.preventDefault();
            $console.log("This is reserved for automatic interaction only", "orange");
        })
    );

    // import feature
    document.getElementById('files').addEventListener('change', handleFileSelect);

    // command description
    add_descriptions();

    // welcome text added in static HTML so google can crawl the link
}

/**
 * Adds description as title of all .cmd Elements.
 */
function add_descriptions() {
    let descriptions = {
        "LOAD" : "Laden eines Wertes aus einer Speicherzelle in den Akkumulator",
        "LOADI": "Direktes Laden eines Wertes in den Akkumulator",
        "STORE": "Schreiben des Akkumulatorwertes in eine Speicherzelle",
        "ADD"  : "Der Wert einer Speicherzelle wird auf den Akkumulatorwert addiert",
        "ADDI" : "Ein direkt definierter Wert wird auf den Akkumulatorwert addiert",
        "SUB"  : "Der Wert einer Speicherzelle wird vom Akkumulatorwert subtrahiert",
        "SUBI" : "Ein direkt definierter Wert wird vom Akkumulatorwert subtrahiert",
        "MUL"  : "Der Akkumulatorwert wird um den Wert einer Speicherzelle vervielfacht",        
        "MULI" : "Der Akkumulatorwert wird um einen direkt definierten Wert vervielfacht",  
        "DIV"  : "Der Akkumulatorwert wird durch den Wert einer Speicherzelle dividiert",
        "DIVI" : "Der Akkumulatorwert wird durch einen direkt definierten Wert dividiert",
        "JUMP" : "Definiert die Speicheradresse des nächsten auszuführenden Befehls",
        "JUMPZ": "Definiert die Speicheradresse des nächsten auszuführenden Befehls, wenn der Akkumulator 0 ist",
        "JUMPP": "Definiert die Speicheradresse des nächsten auszuführenden Befehls, wenn der Akkumulator positiv ist",
        "JUMPN": "Definiert die Speicheradresse des nächsten auszuführenden Befehls, wenn der Akkumulator negativ ist",
        "HOLD" : "Beendet die Programmabarbeitung"
    }
    document.querySelectorAll('.cmd').forEach( o=> {
        o.setAttribute('title', descriptions[o.getAttribute('id')]);
    });
}