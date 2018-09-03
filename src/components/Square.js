import React, { Component } from 'react';
import './Square.css';


class Square extends Component{
    constructor(props){
        super(props);

        this.state = {
            active : false,
            moneyValue:0
        }   
    }
    
    revealValue = (e) => {
        if(this.props.pick() > 0) {
            this.setState({moneyValue: this.props.value });
            this.props.onClick(e);
            this.flip();
        }
    }

    flip = (e) => {
        this.setState({
            active: !this.state.active
        });
    }
    

    render(){
        return(
            <div data-key={this.props['data-key']} className={this.state.active ? 'squareflip' : 'square'} onClick={(e) => this.revealValue(e)} value={this.props.value}>
                {this.state.moneyValue > 0? this.state.moneyValue: ""}
            </div>
        )
    }
}

export default Square;