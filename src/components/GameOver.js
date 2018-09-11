import React, { Component } from 'react';
import './GameOver.css';
import gameoverSFX from '../audio/gameover.wav';
import resetSFX from '../audio/reset.wav';

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
        return(
            <div className="game-over-container">
                <h1 className="game-over-title">
                    {text}
                </h1>
                { this.props.total > 0 ? <p className="total-won">TOTAL WON: ${this.props.total.toLocaleString('en')}</p>: '' }
                <audio ref="audio_tag" src={audio} autoPlay/>

                <div onClick={this.props.reset}>RESET GAME</div>
            </div>
        )
    }
}

export default GameOver;