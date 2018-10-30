import React, { Component } from 'react';
import '../Grid.css';
import Square from '../Square';
import myData from '../../valuesv2.json';
import Total from '../Total';
import LockedTotal from '../LockedTotal';
import Lives from '../Lives';
import GiftBoxContainer from './GiftBoxContainerV2';
import WalkAway from '../WalkAway';

const round = {
    "1": 5,
    "2": 4,
    "3": 4,
    "4": 3,
    "5": 3,
    "6": 2,
    "7": 2,
    "8": 1,
    "9": 1,
};

class Grid extends Component{
    constructor(props){
        super(props);

        this.state = {
            money: [],
            squareGrid: [],
            oldTotal: 0,
            total: 0,
            lockedTotal: 0,
            lives: 3,
            round: 1,
            picks: round[1],
            selectedSquares: [],
            nextRound: false,
            powerPieces: [],
            leftOverSquaresAmount: 25,
            giftBoxes: {},
            lockedGifts: {}
        }
    }
      
    componentDidMount(){
        let money = [...myData[1].values];
        this.setState({money: money}, function(){
            this.buildSquares();
        })
    }

    countPicks = () => {
        let picks = this.state.picks;
        this.setState({picks: picks-1});
        return this.state.picks;
    }

    checkRound = (total) => {
        if(this.state.picks === 1){
            if(this.state.round < 9) {
                this.setState({nextRound: true});
            }
            if(this.state.round === 9) {
                // this.props.endGame(this.state.lives, total, this.state.lockedGifts);
                this.walkAway(total);
            }
        }
    }

    // check the list of values and remove powerpieces that are already selected
    checkPowerPieces = () => {
        let powerPieces = this.state.powerPieces;
        let values = this.state.money;
        
        for(let j = 0; j < powerPieces.length; j++ ){
            for(let i = 0; i < values.length; i++){
                if(values[i] === powerPieces[j]){
                    values.splice(i,1);
                }
            }
        }
        this.setState({money: values}, function(){
            this.buildSquares();}
        );
    }

    nextRound = () => {
        // go to next round
        let nextRound = this.state.round + 1;
        let newMoneyValues = [...myData[nextRound].values];
        this.setState({
            round: nextRound,
            picks: round[nextRound],
            money: newMoneyValues,
            nextRound:false
        }, function(){
            this.checkPowerPieces();
        });
    }

    // Bankrupts or slashes the money in half, locks money into the money lock bank
    powerPieceValueHandler = (powerPiece,total) => {
        switch(powerPiece){
            case "Bankrupt":
                this.deleteGifts();
                return this.state.lockedTotal;
            case "The Slasher":
                return Math.floor((total-this.state.lockedTotal)/2) + this.state.lockedTotal;
            case "Money Lock":
                this.setState({lockedTotal: total});
                this.lockGifts();
                return total;
            case "The Bomb":
                this.removeLife();
                return total;
            case "Small Mystery Box":
            case "Big Mystery Box":
            case "Vitamix":
            case "HDTV":
            case "Trip To Italy":
            case "Porsche":
                this.addGift(powerPiece);
                return total;
            default:
                return total;
        }
    }

    // Add gifts to giftbox object when found
    addGift = (powerPiece) => {
        let giftBoxes = {};
        giftBoxes =  this.state.giftBoxes;
        giftBoxes[powerPiece] = { name: powerPiece, mutable: true };
        this.setState({giftBoxes: giftBoxes});
    }

    // if the gifts are opened they now are mutable with the bankrupt or money lock
    safeGifts = (value, gift) => {
        let giftBoxes = {};
        giftBoxes =  this.state.giftBoxes;
        giftBoxes[value] = { name: value, gift: gift, mutable: true };
        this.setState({giftBoxes: giftBoxes});
    }

    deleteGifts = ()=> {
        let giftBoxes = {};
        giftBoxes =  this.state.giftBoxes;
        for(let key in giftBoxes){
            if(giftBoxes[key].mutable === true){
                delete giftBoxes[key];
            }
        }
        this.setState({giftBoxes: giftBoxes});
    }
   
    lockGifts = () => {
        let giftBoxes = {};
        let lockedGifts = {};
        giftBoxes =  this.state.giftBoxes;
        console.log(giftBoxes, lockedGifts)
        for(let key in giftBoxes){
            if(giftBoxes[key].mutable === true){
                lockedGifts[key] = giftBoxes[key];
                delete giftBoxes[key];
            }
        }
        
        this.setState({giftBoxes: giftBoxes, lockedGifts: lockedGifts});
    }

    // add the value to the total and push the selected square onto the selected square array
    addValue = (e) => {
        let sq = [];
        let powerP = this.state.powerPieces;
        let total = this.state.total;
        let oldTotal = this.state.total;
        let val = e.target.getAttribute("value");
        if(isNaN(val)){
            // check for bomb so that it remains on all rounds
            if(val !== "The Bomb"){
                powerP.push(val);
            }
            total = this.powerPieceValueHandler(val,total);    
        } else {
            total = this.state.total + Number(val);
        }
        sq = this.state.selectedSquares;
        sq.push(e.target.getAttribute('data-key'));
        this.setState({total: total, oldTotal: oldTotal, selectedSquares: sq, powerPieces: powerP});  
        this.checkRound(total);  
    }


    getRandomNumValue = (values) => {
        let random = values[Math.floor(Math.random()*values.length)];
        return random;
    }


    // make sure the money values have the correct amount in the array, either adds or removes a number if the array does not fit the leftover squares
    addValuesToArray = () => {
        let values = this.state.money;
        let amount = this.state.leftOverSquaresAmount;
        let remaining = amount - values.length;

        if(remaining > 0){
            let middle = values[Math.floor((values.length - 1) / 2)];
            for(let i = 0; i < remaining; i++){
                values.push(middle);
            }
        } else if(remaining < 0) {
            while(remaining < 0){
                let randomVal = this.getRandomNumValue(values)
                if(typeof randomVal !== "string"){
                    let index = values.indexOf(randomVal);
                    values.splice(index,1);
                    remaining++;
                }
            }
            
        } 
        amount -= this.state.picks;
        this.setState({money: values,leftOverSquaresAmount: amount});
    }

    // build each square and give it a random value based on the round
    buildSquares = () => {
        let alreadySelected = this.state.selectedSquares;
        
        let squares = [];
        //check the already selected squares, if the id is the same, leave it
        let square;
        let found = false;
        this.addValuesToArray();
        for(let i = 0; i < 25; i++){
            found = false;
            if(alreadySelected.length > 0){
                for(let j=0; j < alreadySelected.length; j++){
                    if(alreadySelected[j] === this.state.squareGrid[i].key){
                        square = 
                         <Square 
                            key={i}
                            onGrey={true}
                            data-key={this.state.squareGrid[i]['data-key']} 
                            >
                        </Square>
                        found = true;
                    }
                }
            } 
            if(!found){
                let value = this.loadValue();  
                square = 
                <Square 
                    key={i}
                    data-key={i} 
                    value={value} 
                    pick={(e)=>this.countPicks(e)} 
                    total={this.state.total} 
                    onClick={(e)=>this.addValue(e)}>
                </Square>
            }
            squares.push(square);
        }    
        this.setState({squareGrid: squares});
    }

    // load correct values based on the round
    loadValue = () => {
        let item = this.state.money.splice([Math.floor(Math.random()*this.state.money.length)],1);
        return item;    
    }

    // remove a life from state on click
    removeLife = () => {
        let lives = this.state.lives - 1;
        this.setState({lives: lives});
        if(lives === 0){
            this.props.endGame(lives, this.state.lockedTotal, this.state.lockedGifts);
        }        
    }

    // send opened boxes to end of round screen
    walkAway = (total) => {
        let safeGifts = {};
        let giftBoxes = this.state.giftBoxes;
        let lockedGift = this.state.lockedGifts;
        for(let giftbox in giftBoxes) {
            if (giftBoxes[giftbox].mutable === true) {
                safeGifts[giftbox] = giftBoxes[giftbox];
            }
        }
        for(let giftbox in lockedGift) {
            if (lockedGift[giftbox].mutable === true) {
                safeGifts[giftbox] = lockedGift[giftbox];
            }
        }
        
        let newTotal = isNaN(total)? this.state.total : total; 
        this.props.endGame(this.state.lives, newTotal, safeGifts);
    }
    
    render() {
        let total = this.state.total;
        let oldTotal = this.state.oldTotal;
        let lockedTotal = this.state.lockedTotal;
        return (
            <div className="">
                <div className="board-area">
                    <div className="grid">
                        {this.state.squareGrid}
                    </div>
                    <div className="totals">
                        <WalkAway endGame={this.walkAway} round={this.state.round}/>
                        <div className="rounds">
                            <h1>Round: {this.state.round}</h1>
                            <div className={this.state.nextRound ? 'next-round-active' : 'next-round-disabled'} onClick={this.nextRound}>>></div>
                        </div>
                        <Lives lives={this.state.lives} onChange={this.removeLife.bind(this)}/>
                        <h2><Total total={total} oldTotal={oldTotal}/></h2>
                        <GiftBoxContainer safeGifts={this.safeGifts} round={this.state.round} giftBoxes={this.state.giftBoxes}/>
                        <h2><LockedTotal lockedTotal={lockedTotal}/></h2>
                        <GiftBoxContainer safeGifts={this.safeGifts} round={this.state.round} lockedGiftBoxes={this.state.lockedGifts}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Grid;