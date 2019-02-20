class Console {
    
    constructor( e=document.getElementById('console') ){
        this.element = e;
    }
    
    log( text,color ){
        this.element.innerHTML+=`<span style="color:${color||'#fff'}">${text}</span><br>`;
        this.element.scrollTop = this.element.scrollHeight;
    }
    
}