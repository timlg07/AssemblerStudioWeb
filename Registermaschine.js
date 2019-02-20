class Registermaschine {
    
    constructor(){
        
        this.isRunning = false;
        
        this.elements = {
            
            actions:
            {
                run     : document.getElementById('b1'),
                hold    : document.getElementById('b2'),
                step    : document.getElementById('b3'),
                reset   : document.getElementById('b4')
            },
            
            flags:
            {
                zero    : document.getElementById('zFlag'),
                negative: document.getElementById('nFlag'),
                overflow: document.getElementById('oFlag')
            },
            
            akkumulator : document.getElementById('akk'),
            befehls_cnt : document.getElementById('cnt'),
            befehls_reg : document.getElementById('cmd'),
            
        }
        
        // handle command inputs:
        document.querySelectorAll( '.cmd' ).forEach(o=>{
            o.addEventListener( 'click',this.handleCmdInput );
        });
        
        // handle button inputs:
        this.elements.actions.run  .onclick = this.run  .bind(this);
        this.elements.actions.hold .onclick = this.hold .bind(this);
        this.elements.actions.step .onclick = this.step .bind(this);
        this.elements.actions.reset.onclick = this.reset.bind(this);
        
        
    }
    
    handleCmdInput( e ){
        if( $storage.focus ){
            $storage.focus.value = e.target.getAttribute('id');
            $storage.focus.focus();
        }
    }
        
    run( ){
        
    }
    
    hold( ){
        
    }
    
    step( ){
        
    }
    
    reset( ){
        
    }
}