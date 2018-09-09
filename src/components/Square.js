import React, { Component } from 'react';
import './Square.css';
import bomb from '../img/bomb.svg';
import bankrupt from '../img/bankrupt.svg';
import moneylock from '../img/moneylock.svg';
import box from '../img/giftbox.svg';
import slasher from '../img/moneyslash.svg';
import moneysfx from '../audio/money.wav';
import bombsfx from '../audio/bomb.mp3';
import mysterysfx from '../audio/giftbox.wav';
import bankruptsfx from '../audio/bankrupt.wav';
import slashsfx from '../audio/slash.mp3';
import locksfx from '../audio/moneylock.mp3';

class Square extends Component{
    constructor(props){
        super(props);

        this.state = {
            active : false,
            moneyValue:"",
            sound : ''
        }   
    }
    
    revealValue = (e) => {
        if(this.props.pick() > 0) {
            this.setState({moneyValue: this.props.value });
            this.props.onClick(e);
            this.flip();
        }
    }

    playSFX = () => {
        const value = this.props.value;
        let sound;
        switch(value[0]) {
            case "Small Mystery Box":
            case "Big Mystery Box":
                sound = mysterysfx;
                break;
            case "The Bomb":
                sound = bombsfx;
                break;
            case "Bankrupt":
                sound = bankruptsfx;
                break;
            case "The Slasher":
                sound = slashsfx;
                break;
            case "Money Lock":
                sound = locksfx;
                break;
            default:
                sound = moneysfx;
                break;
        }
        return sound;
    }

    flip = () => {
        this.setState({
            active: !this.state.active,
            sound: this.playSFX()
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
                return <img className="icon-small" src={box} alt={value[0]}/>;
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
                <audio ref="audio_tag" src={this.state.sound} autoPlay/>

            </div>
        )
    }
}

export default Square;