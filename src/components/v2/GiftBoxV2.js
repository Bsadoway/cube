import React, { Component } from 'react';
import '../GiftBox.css';
import '../Square.css'
import giftBox from '../../img/giftbox.svg';
import porsche from '../../img/porsche.svg';
import rome from '../../img/rome.svg';
import vitamix from '../../img/vitamix.svg';
import bose from '../../img/bose.svg';
import hdtv from '../../img/hdtv.svg';
import washer from '../../img/washer.svg';
import giftSelectsfx from '../../audio/giftbox-select.mp3';


class GiftBox extends Component{
    constructor(props){
        super(props);

        this.state = {
            active: true,
            reveal: "",
            mutable: false,
            sound: ""
        }
    }
    
   

    setIcon = () => {
        let value = this.props.datavalue;
        switch(value){
            case "Bose Headphones":
                return bose;
            case "Vitamix":
                return vitamix;
            case "HDTV":
                return hdtv;
            case "Washer":
                return washer;
            case "Trip To Italy":
                return rome;
            case "Porsche":
                return porsche;
            default: 
                return giftBox;
        }
    }

    render(){
        let giftClass = this.state.active? "green-square selectable" : "green-square selected";
        let giftBoxSrc = this.setIcon();
        return(
            <div>   {this.props.locked ? 
                    <div className="green-square selected locked" value={this.props.gift}>
                        <img className="icon-gift locked-gift" src={giftBoxSrc} alt={this.props.gift}/>
                    </div>
                    :
                    <div className={giftClass} value={this.state.reveal}>
                        <img className="icon-mystery" src={giftBoxSrc} alt={this.state.reveal}/>
                        <audio ref="audio_tag" src={this.state.sound} autoPlay/>
                    </div>
                    }
            </div>
        )
    }
}

export default GiftBox;