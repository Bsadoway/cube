import React, { Component } from 'react';
import './GiftBox.css';
import GiftBox from './GiftBox';


class GiftBoxContainer extends Component{
    constructor(props){
        super(props);

        this.state = {
        }
        
    }
    
    render(){
        let giftBoxes = this.props.giftBoxes;
        let boxes = [];  
        for(let i = 0;i < giftBoxes.length; i++ ){
            boxes.push(<GiftBox bankrupt={this.props.bankrupt} moneylock={this.props.moneylock} key={i} round={this.props.round} datavalue={giftBoxes[i]}/>)
        }
        return(
            <div className="gift-box-container">
               {boxes}
            </div>
        )
    }
}

export default GiftBoxContainer;