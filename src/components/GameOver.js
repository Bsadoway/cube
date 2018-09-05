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
                <button onClick={this.props.reset}>RESET GAME</button>
            </div>
        )
    }
}

export default GameOver;