import React, { Component } from 'react';
import './Grid.css';
import Square from './Square';
import myData from '../values.json';
import Total from './Total';

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

const powerPieces = {
    "2": ["Small Mystery Box", "The Slasher"],
    "3": ["The Bomb", "Big Mystery Box"],
    "4": ["Money Lock", "Bankrupt"]
}


class Grid extends Component{
    constructor(props){
        super(props);

        this.state = {
            money: myData[1],
            squareGrid: [],
            total: 0,
            round: 1,
            picks: round[1],
            selectedSquares: [],
            nextRound: false,
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
            let newMoneyValues = myData[nextRound];
            
            this.setState({
                round: nextRound,
                picks: round[nextRound],
                money: newMoneyValues,
                nextRound:false
            }, function(){console.log("setstate complete", this.state); this.buildSquares();});
            
        }
        // grey out chosen squares
        // add new values to the squares left

    }

    greyOutSquares = (e) => {
        console.log(e.target)
        let selectedSquares = this.state.selectedSquares;
        let squareGrid = this.state.squareGrid;
        if(selectedSquares){
            for(let i=0; i< selectedSquares.length; i++){
                if(selectedSquares[i] === e.target){
                   console.log("YUP");
                   
                }
            }
        } 
    }

    // add the value to the total and push the selected square onto the selected square array
    addValue = (e) => {
        let sq = [];
        let val = Number(e.target.getAttribute("value"));
        console.log(`Value:${val} ${e.target}`)
        let total = this.state.total + val;
        sq = this.state.selectedSquares;
        sq.push(e.target.getAttribute('data-key'));
        this.setState({total: total, selectedSquares: sq});  
        this.checkRound();  
    }

    addPowerPieces = () => {

    }

    // build each square and give it a random value based on the round
    buildSquares = () => {
        let alreadySelected = this.state.selectedSquares;
        let squares = [];
        //check the already selected squares, if the id is the same, leave it
        let square;
        let grey = false;
        let found = false;
        for(let i = 0; i < 25; i++){
            found = false;
            if(alreadySelected){
                for(let j=0; j< alreadySelected.length; j++){
                    if(alreadySelected[j] === this.state.squareGrid[i].key){
                        grey = true;
                        // square = this.state.squareGrid[i];
                        square = 
                         <Square 
                            key={i}
                            onChange={grey}
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
    loadValue = () =>{
        let item = this.state.money.values.splice([Math.floor(Math.random()*this.state.money.values.length)],1);
        return item;    
     }
    
    render() {
        return (
            <div>
                <h1>Round: {this.state.round}</h1>
                <div className={this.state.nextRound ? 'next-round-active' : 'next-round-disabled'} onClick={this.nextRound}>Next Round</div>
                    <div className="grid">
                        {this.state.squareGrid}
                    </div>
                <h2><Total total={this.state.total}/></h2>
            </div>
        )
    }
}

export default Grid;