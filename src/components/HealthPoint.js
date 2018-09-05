import React, { Component } from 'react';
import './Lives.css';


class HealthPoint extends Component{
    constructor(props){
        super(props);

        this.state = {
            dead: false
        }
    }

    killHeart = (e) =>{
        this.setState({dead:true});
        this.props.onChange();
    }
    
    render(){
        return(
            <div className={this.state.dead || this.props.dead? "heart-container-dead" : "heart-container"} onClick={e => this.killHeart(e)}>

            </div>
        )
    }
}

export default HealthPoint;