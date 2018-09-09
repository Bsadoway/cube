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
        // for(let i = 0;i < giftBoxes.length; i++ ){
        //     boxes.push(<GiftBox bankrupt={this.props.bankruptSwitch} moneylock={this.props.moneylock} key={i} round={this.props.round} datavalue={giftBoxes[i]}/>)
        // }
        for(let key in giftBoxes){
            boxes.push(<GiftBox safeGifts={this.props.safeGifts} moneylock={this.props.moneylock} key={key} round={this.props.round} datavalue={giftBoxes[key].name}/>)
        }
        return(
            <div className="gift-box-container">
               {boxes}
            </div>
        )
    }
}

export default GiftBoxContainer;