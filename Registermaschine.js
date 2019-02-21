class Registermaschine {
    
    constructor(){
        
        this.isRunning = false;
        this.operand   = 0;
        
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
        this.elements.actions.run  .onclick = this.run  .bind( this );
        this.elements.actions.hold .onclick = this.hold .bind( this,true );
        this.elements.actions.step .onclick = this.step .bind( this,true );
        this.elements.actions.reset.onclick = this.reset.bind( this );
        
        
    }
    
    handleCmdInput( e ){
        if( $storage.focus ){
            $storage.focus.value = e.target.getAttribute('id');
            $storage.focus.focus();
        }
    }
        
    run( ){
        this.isRunning = true;
        this._run();
    }
    
    _run( ){
        if( this.isRunning ){
            this.step( false );
            setTimeout( this._run.bind(this),$delay );
        }
    }
    
    hold( userHold ){
        this.isRunning = false;
        if( userHold ){
            $console.log( 'Execution paused.' );
        } else {
            $console.log( 'Execution finished.','#64DD17')
        }
    }
    
    step( userCall ){
        this.fetch();
        this.fetchOperand();
        this.execute();
        this.elements.befehls_cnt.value -= (this.isRunning||userCall)?-2:0;
    }
    
    fetch( ){
        if( this.elements.befehls_cnt.value > $storage.speicherZellen.length || this.elements.befehls_cnt.value <= 0 ){
            $console.log( `Error while fetching operator: cell ${this.elements.befehls_cnt.value} does not exist.`,'red');
            this.isRunning = false;
        }
        this.elements.befehls_reg.value = $storage.speicherZellen[this.elements.befehls_cnt.value-1].value||'';
    }
    
    fetchOperand( ){
        if( this.elements.befehls_cnt.value-(-1) > $storage.speicherZellen.length ){
            $console.log( `Error while fetching operand: cell ${this.elements.befehls_cnt.value-(-1)} does not exist.`,'red');
            this.isRunning = false;
        }
        
        this.operand = Number.parseInt($storage.speicherZellen[this.elements.befehls_cnt.value].value||0);
        
        if( Number.isNaN(this.operand) ){
            $console.log( `Error while fetching operand; NaN: ${$storage.speicherZellen[this.elements.befehls_cnt.value].value} is not a Number.`,'red');
            this.isRunning = false;
        }
    }
    
    execute( ){
        switch(this.elements.befehls_reg.value){
            case 'LOAD':
                this.loadOperandValue();
            case 'LOADI':
                this.akkumulator = this.operand;
                $console.log( 'LOADED: '+this.operand );
                break;
                
            case 'STORE':
                $storage.speicherZellen[this.operand-1].value = this.akkumulator;
                $console.log( 'STORED in: '+this.operand );
                break;
                
            case 'ADD':
                this.loadOperandValue();
            case 'ADDI':
                this.akkumulator += this.operand;
                $console.log( 'ADDED: '+this.operand );
                break;
            
            case 'SUB':
                this.loadOperandValue();
            case 'SUBI':
                this.akkumulator -= this.operand;
                $console.log( 'SUBTRACTED: '+this.operand );
                break;
            
            case 'MUL':
                this.loadOperandValue();
            case 'MULI':
                this.akkumulator *= this.operand;
                $console.log( 'MULTIPLIED with: '+this.operand );
                break;
            
            case 'DIV':
                this.loadOperandValue();
            case 'DIVI':
                this.akkumulator /= this.operand;
                $console.log( 'DIVIDED by: '+this.operand );
                break;
            
            case 'JUMP':
                this.jump();
                break;
            case 'JUMPZ':
                if( this.elements.flags.zero.checked ){ 
                    this.jump(); 
                }
                break;
            case 'JUMPN':
                if( this.elements.flags.negative.checked ){ 
                    this.jump(); 
                }
                break;
            case 'JUMPP':
                if( 
                    !this.elements.flags.negative.checked &&
                    !this.elements.flags.zero.checked
                ){ 
                    this.jump(); 
                }
                break;
            case 'HOLD':
                this.hold( false );
                break;
            case '':
                $console.log( 'no command.','orange' );
                break;
            default:
                $console.log( `SyntaxError: Command ${this.elements.befehls_reg.value} does not exist`,'red' );
                break;
        }
    }
    
    loadOperandValue( ){
        
        if( this.operand > $storage.speicherZellen.length || this.operand <= 0 ){
            $console.log( `Error while loading operand: cell ${this.operand} does not exist.`,'red');
            this.isRunning = false;
        }
        
        this.operand = Number.parseInt($storage.speicherZellen[this.operand-1].value||0);
        
        if( Number.isNaN(this.operand) ){
            $console.log( `Error while loading operand; NaN: ${this.operand} is not a Number.`,'red');
            this.isRunning = false;
        }
        
    }
    
    jump( ){
        this.elements.befehls_cnt.value = this.operand-2; // because 2 will be added in next step
        $console.log( 'JUMPED to: '+this.operand );
    }
    
    reset( ){
        
        this.elements.flags.negative.checked = false;
        this.elements.flags.zero    .checked = false;
        this.elements.flags.overflow.checked = false;
        
        this.elements.akkumulator.value =  0;
        this.elements.befehls_cnt.value =  1;
        this.elements.befehls_reg.value = '';
        
        $console.log( 'Reseted.<br><br>' )
        
    }
    
    set akkumulator( value ){
        
        if( Number.isNaN(Number.parseInt(value)) ){
            $console.log( `Error while setting the "Akkumulator"; NaN: ${value} is not a Number.`,'red' );
            this.isRunning = false;
            return;
        }
        
        this.elements.flags.negative.checked = value   < 0;
        this.elements.flags.zero    .checked = value === 0;
        this.elements.flags.overflow.checked = Math.abs(value) > Number.MAX_SAFE_INTEGER;
        
        this.elements.akkumulator.value = Math.floor( Math.abs( value ));
        
    }
    
    
    get akkumulator( ){
        
        return (this.elements.flags.negative.checked?-1:1) * this.elements.akkumulator.value;
        
    }
}