import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid';
import GameOver from './components/GameOver';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      game: ()=><Grid endGame={this.endGame}/>,
      gameOver: false

      
    };
  }

  componentDidMount(){
  }

  endGame = () =>{
    this.setState({gameOver:true});
  }

  newGame = () => {
    this.setState({
      game: () => <Grid endGame={this.endGame}/>,
      gameOver: false
    });
  }

  render() {
    const ActiveGame = this.state.game;
    return (
      <div>
        {this.state.gameOver ? <GameOver reset={this.newGame}/> : "" }
        <ActiveGame />

      </div>

    );
  }
}

export default App;
