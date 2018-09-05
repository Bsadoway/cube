import React, { Component } from 'react';
import './Lives.css';
import HealthPoint from './HealthPoint';


class Lives extends Component{
    constructor(props){
        super(props);

        this.state = {
            lives: 3,
            hearts: []
        }
        
    }

    buildLives = () => {
        let hearts = [];
        for(let i = 0; i < this.props.lives; i++){
            hearts.push(<HealthPoint key={i} dead={false}/>)
        }
        for(let i = 0; i < (3-this.props.lives); i++){
            hearts.push(<HealthPoint key={i} dead={true}/>)
        }
        return hearts;
    }
    
    render(){
        return(
            <div className="heart-containers">
                {this.buildLives()}
            </div>
        )
    }
}

export default Lives;