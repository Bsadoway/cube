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




class Grid extends Component{
    constructor(props){
        super(props);

        this.state = {
            money: myData[1].values,
            squareGrid: [],
            total: 0,
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
            }, function(){console.log("setstate complete"); this.checkPowerPieces();});
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
            console.log("setstate complete2", this.state.money); 
            this.buildSquares();}
        );
        
    }

    addValuesToArray = () => {
        let values = this.state.money;
        let amount = this.state.leftOverSquaresAmount;
        let middle = values[Math.floor((values.length - 1) / 2)];
        if(values.length === amount || this.state.round === 1){
            return;
        } else { 
            amount -= this.state.picks;
            console.log(amount, values.length);

            let remaining = amount - values.length -1;
            console.log(remaining, amount, values.length);
            
            for(let i = remaining; i !== 0; i--){
                values.push(middle);
            }
            console.log(values, amount);
            
            this.setState({money: values, leftOverSquaresAmount: amount }, function(){
                console.log("setstate complete3"); 
            });
        }

        //load up current array of values
        // if values === 25 - the round picks do nothing
        // else add average values up to 25 - picks
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