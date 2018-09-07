import React, { Component } from 'react';
import './Square.css';
import bomb from '../img/bomb.svg';
import bankrupt from '../img/bankrupt.svg';
import moneylock from '../img/moneylock.svg';
import box from '../img/giftbox.svg';
import slasher from '../img/moneyslash.svg';

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
        switch(value[0]) {
            case "The Bomb":
                return <img className="icon" src={bomb} alt={value[0]}/>;
            case "Bankrupt":
                return <img className="icon-big" src={bankrupt} alt={value[0]}/>;
            case "Money Lock":
                return <img className="icon" src={moneylock} alt={value[0]}/>;
            case "The Slasher":
                return <img className="icon" src={slasher} alt={value[0]}/>;
            case "Small Mystery Box":
            case "Big Mystery Box":
                return <img className="icon" src={box} alt={value[0]}/>;
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