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
        let lockedGiftBoxes = this.props.lockedGiftBoxes;
        let boxes = []; 
        let lockedBoxes = []; 
        for(let key in giftBoxes){
            boxes.push(<GiftBox safeGifts={this.props.safeGifts} key={key} round={this.props.round} datavalue={giftBoxes[key].name}/>)
        }
        for(let key in lockedGiftBoxes){
            lockedBoxes.push(<GiftBox key={key} datavalue={lockedGiftBoxes[key].name} gift={lockedGiftBoxes[key].gift} locked={true}/>)
        }
        return(
            <div className="gift-box-container">
               {boxes}
               {lockedBoxes}
            </div>
        )
    }
}

export default GiftBoxContainer;