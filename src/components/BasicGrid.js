import React, { Component } from 'react';
import './Grid.css';
import Square from './Square';
import myData from '../values.json';

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
                // this.props.endGame(this.state.lives, total);
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


    // add the value to the total and push the selected square onto the selected square array
    addValue = (e) => {
        let sq = [];
        let powerP = this.state.powerPieces;
        let total = this.state.total;
        let oldTotal = this.state.total;
        let val = e.target.getAttribute("value");
        if(isNaN(val)){
            powerP.push(val);
            total = this.powerPieceValueHandler(val,total);    
        } else {
            total = this.state.total + Number(val);
        }
        sq = this.state.selectedSquares;
        sq.push(e.target.getAttribute('data-key'));
        this.setState({total: total, oldTotal: oldTotal, selectedSquares: sq, powerPieces: powerP});  
        this.checkRound(total);  
    }


   
    // build each square and give it a random value based on the round
    buildSquares = () => {
        let alreadySelected = this.state.selectedSquares;
        let squares = [];
        //check the already selected squares, if the id is the same, leave it
        let square;
        let found = false;
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
                        </Square>;
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
        // let item = this.state.money.splice([Math.floor(Math.random()*this.state.money.length)],1);
        return 1;    
    }

    render() {
        return (
            <div className="">
            BASIC GRID
                <div className="board-area">
                    <div className="grid">
                        {this.state.squareGrid}
                    </div>
                    <div className="totals">
                        <div className="rounds">
                            <h1>Round: {this.state.round}</h1>
                            <div className={this.state.nextRound ? 'next-round-active' : 'next-round-disabled'} onClick={this.nextRound}>>></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Grid;