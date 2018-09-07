import React, { Component } from 'react';
import './GameOver.css';


class GameOver extends Component{
    constructor(props){
        super(props);

        this.state = {
        }
        
    }
    
    render(){
        return(
            <div className="game-over-container">
                GAME OVER
                <div onClick={this.props.reset}>RESET GAME</div>
            </div>
        )
    }
}

export default GameOver;