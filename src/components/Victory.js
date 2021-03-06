import React, { Component } from 'react';
import './GameOver.css';
import gameoverSFX from '../audio/gameover.wav';

class Victory extends Component{
    constructor(props){
        super(props);

        this.state = {
        }
        
    }
    
    render(){
        return(
            <div className="game-over-container">
                <h1 className="game-over-title">
                    Victory
                </h1>
                    <audio ref="audio_tag" src={gameoverSFX} autoPlay/>

                <div onClick={this.props.reset}>RESET GAME</div>
            </div>
        )
    }
}

export default Victory;