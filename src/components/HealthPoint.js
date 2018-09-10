import React, { Component } from 'react';
import './Lives.css';
import death from '../audio/death.wav';

class HealthPoint extends Component{
    constructor(props){
        super(props);

        this.state = {
            dead: false,
            sound: ""
        }
    }

    killHeart = (e) =>{
        this.setState({dead:true, sound: death});
        this.props.onChange();
    }
    
    render(){
        return(
            <div className={this.state.dead || this.props.dead? "heart-container-dead" : "heart-container"} onClick={e => this.killHeart(e)}>
                <audio ref="audio_tag" src={this.state.sound} autoPlay/>
            </div>
        )
    }
}

export default HealthPoint;