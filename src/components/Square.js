import React, { Component } from 'react';
import './Square.css';


class Square extends Component{
    constructor(props){
        super(props);

        this.state = {
            active : false,
            moneyValue:"",
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
        const grey = this.props.onGrey? "grey" : "";
        const squareActive = this.state.active ? 'squareflip' : 'square';
        const squareClasses = `${grey} ${squareActive}`;
        return(
            <div data-key={this.props['data-key']} className={squareClasses}  onClick={(e) => this.revealValue(e)} value={this.props.value}>
                {this.state.moneyValue}
            </div>
        )
    }
}

export default Square;