import React, { Component } from 'react';
import './Total.css';
import lock from '../img/lock-icon.svg';


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
                <img  className="lock-icon" src={lock} alt="" />
                ${lockedTotal.toLocaleString('en')}
            </div>
        )
    }
}

export default LockedTotal;