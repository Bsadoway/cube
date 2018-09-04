import React, { Component } from 'react';
import './Total.css';


class LockedTotal extends Component{
    constructor(props){
        super(props);

        this.state = {
        }
        
    }
    
    render(){
        let visible = this.props.lockedTotal > 0 ? "":"invisible";
        let lockedClasses = `${visible} total-box`;
        return(
            
            <div className={lockedClasses}>${this.props.lockedTotal}
            </div>
        )
    }
}

export default LockedTotal;