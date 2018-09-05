import React, { Component } from 'react';
import './Lives.css';
import HealthPoint from './HealthPoint';


class Lives extends Component{
    constructor(props){
        super(props);

        this.state = {
            hearts: [],
        }
    }

    buildLives = () => {
        let hearts = [];
        let count = 0;
        for(let i = 0; i < this.props.lives; i++){
            hearts.push(<HealthPoint key={i} dead={false}  onChange={this.props.onChange}/>)
            count = i;
        }
        for(let i = 0; i < (3-this.props.lives); i++){
            count++;
            hearts.push(<HealthPoint key={count} dead={true} />)
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