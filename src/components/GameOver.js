import React, { Component } from 'react';
import './GameOver.css';
import gameoverSFX from '../audio/gameover.wav';
import resetSFX from '../audio/reset.wav';
import GiftBoxContainer from './GiftBoxContainer';

class GameOver extends Component{
    constructor(props){
        super(props);

        this.state = {
            sound: ""
        }
        
    }

    render(){
        const text = this.props.lives === 0? "GAME OVER" : "VICTORY";
        const audio = this.props.lives === 0? gameoverSFX : resetSFX;
        const giftLength = Object.keys(this.props.gifts).length;
        
        return(
            <div className="game-over-container">
                <h1 className="game-over-title">
                    {text}
                </h1>
                <p className="total-won">TOTAL WON: ${this.props.total.toLocaleString('en')}</p>
                <audio ref="audio_tag" src={audio} autoPlay/>
                {giftLength > 0? <GiftBoxContainer lockedGiftBoxes={this.props.gifts}/> :""}
                <div className="reset" onClick={this.props.reset}>RESET GAME</div>
            </div>
        )
    }
}

export default GameOver;