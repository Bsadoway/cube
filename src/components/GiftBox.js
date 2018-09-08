import React, { Component } from 'react';
import './GiftBox.css';
import './Square.css'
import giftBox from '../img/giftbox.svg';


class GiftBox extends Component{
    constructor(props){
        super(props);

        this.state = {
            active: true,
            reveal: ""
        }
        
    }
    
    onClick = (e) => {
        console.log(this.props.datavalue);
        let round = this.props.round;
        let value = this.props.datavalue;
        let reveal = "";
        if(value === "Small Mystery Box"){
            if(round <= 3) {
                reveal ="Bose Headphones";
            } else {
                reveal ="Vitamax";
                
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
    }

    returnActive = () => {
        return this.state.active;
    }


    render(){
        let giftClass = this.state.active ? "green-square selectable" : "gift-box-opened";
        return(
            <div>
                {this.props.bankrupt && !this.state.active ? "" : 
                    <div className={giftClass} value={this.state.reveal} onClick={e =>this.onClick(e)}>
                        <img className="icon" src={giftBox} alt={this.state.reveal}/>
                    </div>
                }
            </div>
        )
    }
}

export default GiftBox;