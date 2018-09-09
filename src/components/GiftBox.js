import React, { Component } from 'react';
import './GiftBox.css';
import './Square.css'
import giftBox from '../img/giftbox.svg';
import porsche from '../img/porsche.svg';
import rome from '../img/rome.svg';
import vitamix from '../img/vitamix.svg';
import bose from '../img/bose.svg';


class GiftBox extends Component{
    constructor(props){
        super(props);

        this.state = {
            active: true,
            reveal: "",
            mutable: false
        }
        
    }
    
    onClick = (e) => {
        let round = this.props.round;
        let value = this.props.datavalue;
        let reveal = "";
        if(value === "Small Mystery Box"){
            if(round <= 3) {
                reveal ="Bose Headphones";
            } else {
                reveal ="Vitamix";
                
            }
        }
        
        if(value === "Big Mystery Box"){
            if(round <= 4) {
                reveal = "Trip to Italy";
            } else {
                reveal = "Porsche";
            }
        }
        this.setState({active: false, reveal: reveal});
        this.props.safeGifts(value, reveal);
    }

    setIcon = (gift) => {
        let revealValue = this.state.reveal;
        if(gift) {
            revealValue = gift;
        }
        switch(revealValue){
            case "Bose Headphones":
                return bose;
            case "Vitamix":
                return vitamix;
            case "Trip to Italy":
                return rome;
            case "Porsche":
                return porsche;
            default: 
                return giftBox;
        }
    }

    render(){
        let giftClass = this.state.active? "green-square selectable" : "green-square selected";
        let giftBoxSrc = this.setIcon(this.props.gift);
        let iconSizeClass = this.props.datavalue === "Small Mystery Box" ? "icon-small" : "icon";
        let iconClass = this.state.active ? iconSizeClass : "icon-gift";
        return(
            <div>   {this.props.locked ? 
                    <div className="green-square selected locked" value={this.props.gift}>
                        <img className="icon-gift locked-gift" src={giftBoxSrc} alt={this.props.gift}/>
                    </div>
                    :
                    <div className={giftClass} value={this.state.reveal} onClick={e =>this.onClick(e)}>
                        <img className={iconClass} src={giftBoxSrc} alt={this.state.reveal}/>
                    </div>
                    }
            </div>
        )
    }
}

export default GiftBox;