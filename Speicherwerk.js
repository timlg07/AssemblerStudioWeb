class Speicherwerk {
    
    constructor( cells = 40, table = document.querySelector('#speicher table') ){
        this.table = table;
        this.tbody = document.createElement( 'tbody' );
        this.table.appendChild( this.tbody );
        this.speicherZellen = [];
        
        while( this.speicherZellen.length < cells ){
            let tr = document.createElement( 'tr' );
            let td = document.createElement( 'td' );
            td.innerText = this.speicherZellen.length+1;
            tr.appendChild( td );
            
            let cellA = this.createCell();
            let cellB = this.createCell();
            cellA.setAttribute( 'id','SZ_'+(this.speicherZellen.length+1) );
            cellB.setAttribute( 'id','SZ_'+(this.speicherZellen.length+2) );
            tr.appendChild( cellA );
            tr.appendChild( cellB );
            this.speicherZellen.push( cellA );
            this.speicherZellen.push( cellB );
            
            this.tbody.appendChild( tr );
        }
    }
    
    // @return {HTML-Element:td} new cell
    createCell( ){
        let td = document.createElement( 'td' );
        let ip = document.createElement( 'input' );
        ip.classList.add( 'cell' );
        ip.setAttribute ( 'type','text' );
        td.appendChild  ( ip );
        return td;
    }
    
}