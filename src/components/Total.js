import React, { Component } from 'react';
import './Square.css';
import CountUp from 'react-countup';


class Total extends Component{
    constructor(props){
        super(props);

        this.state = {
        }
        
    }
    
    render(){
        let numberUp = Number(this.props.total);
        return(
            <div className="total-box">
                $
                <CountUp start={this.props.oldTotal} end={numberUp} separator=","/>
            </div>
        )
    }
}

export default Total;