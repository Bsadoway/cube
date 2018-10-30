import React, { Component, Fragment } from 'react';
import './WalkAway.css';


class WalkAway extends Component{
    constructor(props){
        super(props);

        this.state = {
        }
    }
    
    render(){
        return(
            <Fragment>
                { this.props.round >= 2? 
                    <div className="walk-away-btn" onClick={this.props.endGame}>
                        Walk Away
                    </div> 
                    : ""
                }
            </Fragment>
        )
    }
}

export default WalkAway;