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
        let lockedTotal = this.props.lockedTotal;
        return(
            
            <div className={lockedClasses}>
                ${lockedTotal.toLocaleString('en')}
            </div>
        )
    }
}

export default LockedTotal;