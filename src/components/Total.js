import React, { Component } from 'react';
import './Square.css';


class Total extends Component{
    constructor(props){
        super(props);

        this.state = {
        }
        
    }
    
    render(){
        return(
            <div className="total-box">${this.props.total}
            </div>
        )
    }
}

export default Total;