import React, { Component } from 'react';
import './Lives.css';


class HealthPoint extends Component{
    constructor(props){
        super(props);

        this.state = {
            dead: false
        }
        
    }

    killHeart = () =>{
        this.setState({dead:true});
    }
    
    render(){
        return(
            <div className={this.state.dead || this.props.dead? "heart-container-dead" : "heart-container"} onClick={this.killHeart}>

            </div>
        )
    }
}

export default HealthPoint;