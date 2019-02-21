class Speicherwerk {
    
    constructor( cells = 40, table = document.querySelector('#speicher table') ){
        
        this.table = table;
        this.tbody = document.createElement( 'tbody' );
        this.table.appendChild( this.tbody );
        this.speicherZellen = [];
        
        while( this.speicherZellen.length < cells ){
            this.createTableRow();
        }
        
        this.focus = null;
        
    }
    
    
    // @return {HTML-Element:td} new cell
    _createCell( ){
        
        let td = document.createElement( 'td' );
        let ip = document.createElement( 'input' );
        ip.classList.add( 'cell' );
        ip.setAttribute ( 'type','text' );
        ip.addEventListener( 'focus',this.setFocus.bind(this) )
        td.appendChild  ( ip );
        return {td:td,ip:ip};
        
    }
    
    
    // @method creates a new table row (which consists of two cells) and adds it to the table.
    createTableRow( autoScroll ){
        
        let tr = document.createElement( 'tr' );
        let td = document.createElement( 'td' );
        
        td.innerText = this.speicherZellen.length+1;
        tr.appendChild( td );
        
        let cellA = this._createCell();
        let cellB = this._createCell();
        
        cellA.td.setAttribute( 'id','SZ_'+(this.speicherZellen.length+1) );
        cellB.td.setAttribute( 'id','SZ_'+(this.speicherZellen.length+2) );
        cellA.td.setAttribute( 'title','Speicheradresse: '+(this.speicherZellen.length+1) );
        cellB.td.setAttribute( 'title','Speicheradresse: '+(this.speicherZellen.length+2) );
        
        tr.appendChild( cellA.td );
        tr.appendChild( cellB.td );
        
        this.speicherZellen.push( cellA.ip );
        this.speicherZellen.push( cellB.ip );
        
        this.tbody.appendChild( tr );
        
        if( autoScroll ){ 
            this.table.parentElement.scrollTop = this.table.parentElement.scrollHeight; 
            $console.log( 'New cells added.' )
        }
        
    }
    
    // @method gets called if a cell is focussed
    setFocus( e ){
        this.focus = e.target;
    }
    
}