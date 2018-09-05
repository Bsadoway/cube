import React, { Component } from 'react';
import './Grid.css';
import Square from './Square';
import myData from '../values.json';
import Total from './Total';
import LockedTotal from './LockedTotal';
import Lives from './Lives';

const round = {
    "1": 5,
    "2": 4,
    "3": 4,
    "4": 3,
    "5": 3,
    "6": 2,
    "7": 2,
    "8": 1,
}

class Grid extends Component{
    constructor(props){
        super(props);

        this.state = {
            money: myData[1].values,
            squareGrid: [],
            total: 0,
            lockedTotal: 0,
            lives: 3,
            round: 1,
            picks: round[1],
            selectedSquares: [],
            nextRound: false,
            powerPieces: [],
            leftOverSquaresAmount: 20
          }
    }
      
    componentDidMount(){
        this.setState({
            squareGrid :this.buildSquares(),
            picks: round[1]
        });
    }

    countPicks = () => {
        let picks = this.state.picks;
        this.setState({picks: picks-1});
        return this.state.picks;
    }

    checkRound = () => {
        if(this.state.picks === 1){
            console.log("out of round picks");
            this.setState({nextRound: true});
        }
    }

    nextRound = () => {
        // go to next round
        let nextRound = this.state.round + 1;
        if(nextRound === '9'){
            console.log("game over");
            // TODO make game over popup
        } else {
            let newMoneyValues = myData[nextRound].values;
            
            this.setState({
                round: nextRound,
                picks: round[nextRound],
                money: newMoneyValues,
                nextRound:false
            }, function(){
                console.log("setstate complete"); 
                this.checkPowerPieces();
            });
        }
    }

    // Bankrupts or slashes the money in half, locks money into the money lock bank
    powerPieceValueHandler = (powerPiece,total) => {
        switch(powerPiece){
            case "Bankrupt":
                return 0;
            case "The Slasher":
                return Math.floor(total/2);
            case "Money Lock":
                this.setState({lockedTotal: total});
                return 0;
            case "The Bomb":
                let lives = this.state.lives - 1;
                this.setState({lives: lives});
                return total;
            default:
                return total;
        }
    }
   
    // add the value to the total and push the selected square onto the selected square array
    addValue = (e) => {
        let sq = [];
        let powerP = this.state.powerPieces;
        let total = this.state.total;
        let val = e.target.getAttribute("value");
        if(isNaN(val)){
            powerP.push(val);
            total = this.powerPieceValueHandler(val,total);    
        } else {
            total = this.state.total + Number(val);
        }
        sq = this.state.selectedSquares;
        sq.push(e.target.getAttribute('data-key'));
        this.setState({total: total, selectedSquares: sq, powerPieces: powerP});  
        this.checkRound();  
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
            console.log("setstate complete2"); 
            this.buildSquares();}
        );
        
    }

    // make sure the values have the correct amount of picks
    addValuesToArray = () => {
        let values = this.state.money;
        let amount = this.state.leftOverSquaresAmount;
        let middle = values[Math.floor((values.length - 1) / 2)];
        if(values.length === amount || this.state.round === 1){
            return;
        } else { 
            amount -= this.state.picks;
            let remaining = amount - values.length -1;
            for(let i = 0; i < remaining; i++){
                values.push(middle);
            }
            this.setState({money: values, leftOverSquaresAmount: amount }, function(){
                console.log("setstate complete3"); 
            });
        }
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
            if(alreadySelected){
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
        return squares;
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
    }
    
    render() {
        let total = this.state.total.toLocaleString('en');
        let lockedTotal = this.state.lockedTotal.toLocaleString('en');
        return (
            <div className="">
                <div className="rounds">
                    <h1>Round: {this.state.round}</h1>
                    <div className={this.state.nextRound ? 'next-round-active' : 'next-round-disabled'} onClick={this.nextRound}>Next Round</div>
                </div>
                <div className="board-area">
                    <div className="grid">
                        {this.state.squareGrid}
                    </div>
                    <div className="totals">
                        <Lives lives={this.state.lives} onChange={this.removeLife.bind(this)}/>
                        <h2><Total total={total}/></h2>
                        <h2><LockedTotal lockedTotal={lockedTotal}/></h2>
                    </div>
                </div>
            </div>
        )
    }
}

export default Grid;