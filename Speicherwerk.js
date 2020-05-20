class Speicherwerk {

    constructor(cells = 40, table = document.querySelector('#speicher table')) {
        this.table = table;
        this.tbody = document.createElement('tbody');
        this.table.appendChild(this.tbody);
        this.speicherZellen = [];
        
        while (this.speicherZellen.length < cells) {
            this.createTableRow();
        }
        
        this.focus = null;
    }

    /**
     * Creates a new cell that can be added to the storage.
     * 
     * @return {Object} The new cells td and input element.
     */
    _createCell() {
        let td = document.createElement('td');
        let ip = document.createElement('input');
        ip.classList.add('cell');
        ip.setAttribute('type', 'text');
        ip.setAttribute('placeholder', '0');
        ip.addEventListener('focus', this.setFocus.bind(this))
        td.appendChild(ip);
        return {td:td, ip:ip};
    }

    /** 
     * Creates a new table row (which consists of two cells) and adds it to the 
     * table.
     * 
     * @param {boolean} autoScroll Scrolls to the bottom if the user triggered
     *        the creation of a new table row.
     */
    createTableRow(autoScroll) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let cellIndex = this.speicherZellen.length + 1;
        
        td.innerText = cellIndex;
        tr.appendChild(td);
        
        let cellA = this._createCell();
        let cellB = this._createCell();
        
        cellA.td.setAttribute('id', 'SZ_' + cellIndex);
        cellB.td.setAttribute('id', 'SZ_' + (cellIndex + 1));
        cellA.td.setAttribute('title', 'Speicheradresse: ' + cellIndex);
        cellB.td.setAttribute('title', 'Speicheradresse: ' + (cellIndex + 1));
        
        tr.appendChild(cellA.td);
        tr.appendChild(cellB.td);
        
        this.speicherZellen.push(cellA.ip);
        this.speicherZellen.push(cellB.ip);
        
        this.tbody.appendChild(tr);
        
        if (autoScroll) { 
            this.table.parentElement.scrollTop = 
                    this.table.parentElement.scrollHeight; 
            $console.log('New cells added.');
        }
    }

    /** 
     * Gets called if a cell is focussed 
     * 
     * @param {Event} e The event with the focussed cell as target.
     */
    setFocus(e) {
        this.focus = e.target;
    }

    /**
     * Sets the content of the cells. Does not modify the amount of cells.
     * 
     * @param {Array} newCellValues The new values of each cell as Strings.
     */
    set content(newCellValues) {
        this.speicherZellen.forEach((o, i) => {
            o.value = newCellValues[i] ? newCellValues[i] : "";
        });
    }

}