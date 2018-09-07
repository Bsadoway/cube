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

    changePowerPieceIcon = (value) => {
        console.log(value);
        switch(value[0]) {
            case "The Bomb":
                return (<img src={'/img/bomb.jpg'} alt={value}></img>);
            default:
                return value;
        }
    }

    changePowerPieceClass = (value) => {
        switch(value[0]){
            case "The Bomb":
            case "Bankrupt":
            case "The Slasher":
                return 'red-square';
            case "Small Mystery Box":
            case "Big Mystery Box":
            case "Money Lock":
                return 'green-square';
            default:
                return 'white-square';
        }
    }
    

    render(){
        const grey = this.props.onGrey? "grey" : "";
        const squareActive = this.state.active ? this.changePowerPieceClass(this.state.moneyValue) : 'square';
        const squareClasses = `${grey} ${squareActive}`;
        const value = Number(this.state.moneyValue) ? `$${this.state.moneyValue.toLocaleString('en')}`: this.changePowerPieceIcon(this.state.moneyValue);
        const key = this.props['data-key'] + 1;
        return(
            <div data-key={this.props['data-key']} className={squareClasses}  onClick={(e) => this.revealValue(e)} value={this.props.value}>
                {this.state.active? value : key}
            </div>
        )
    }
}

export default Square;