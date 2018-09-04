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
    }

   
    // add the value to the total and push the selected square onto the selected square array
    addValue = (e) => {
        let sq = [];
        let total = this.state.total;
        let val = e.target.getAttribute("value");
        if(isNaN(val)){
            console.log(val);       
        } else {
            total = this.state.total + Number(val);
        }
        sq = this.state.selectedSquares;
        sq.push(e.target.getAttribute('data-key'));
        this.setState({total: total, selectedSquares: sq});  
        this.checkRound();  
    }

    addPowerPieces = () => {
        // load the powerpieces into the mydata based on the round
        // if the powerpieces were not selected keep them for the next round
        let round = this.state.round;
        let values = this.state.money.values;
        switch(round) {
            case 2:
                values.push("Small Mystery Box", "The Slasher");
                break;
            case 3:
                values.push("The Bomb", "Big Mystery Box");
                break;
            case 4:
                values.push("Money Lock", "Bankrupt");
                break;
        }
        this.fillArrayOfValues(values, round);
        console.log(values);
        
        this.setState({money: values});
    }

    fillArrayOfValues = (values , round) =>{
        let alreadySelected = this.state.selectedSquares;
        let sMystery = false;
        let slasher = false;
        let bomb = false;
        let bMystery = false;

        console.log(alreadySelected);
        
        if(round > 3) {
            console.log(round);
            
            for(let i = 0; i > alreadySelected; i++){
                if(alreadySelected[i].value === "Small Mystery Box"){
                    sMystery = true;
                } 
                if(alreadySelected[i].value === "The Slasher"){
                    slasher = true;
                } 
            }

            if(!sMystery){
                values.push("Small Mystery Box");
            }
            if(!slasher){
                values.push("The Slasher");
            }
        }
        if(round > 4){
            for(let i = 0; i > alreadySelected; i++){
                if(alreadySelected[i].value === "Big Mystery Box"){
                    bMystery = true;
                } 
                if(alreadySelected[i].value === "The Bomb"){
                    bomb = true;
                } 
            }

            if(!bMystery){
                values.push("Big Mystery Box");
            }
            if(!bomb){
                values.push("The Bomb");
            }
        }
    }

    // build each square and give it a random value based on the round
    buildSquares = () => {
        let alreadySelected = this.state.selectedSquares;
        let squares = [];
        //check the already selected squares, if the id is the same, leave it
        let square;
        let found = false;
        this.addPowerPieces();
        for(let i = 0; i < 25; i++){
            found = false;
            if(alreadySelected){
                for(let j=0; j< alreadySelected.length; j++){
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