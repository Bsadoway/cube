import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid';
import GameOver from './components/GameOver';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      game: ()=><Grid endGame={this.endGame} />,
      gameOver: false,
      lives: 3,
      total: 0,
    };
  }

  componentDidMount(){
  }

  endGame = (lives, total) =>{
    this.setState({gameOver:true, lives: lives, total:total});
  }

  newGame = () => {
    this.setState({
      game: () => <Grid endGame={this.endGame} />,
      gameOver: false,
    });
  }

  render() {
    const ActiveGame = this.state.game;
    return (
      <div className="game-area">
        {this.state.gameOver ? <GameOver reset={this.newGame} lives={this.state.lives} total={this.state.total}/> : "" }
        <ActiveGame />
      </div>

    );
  }
}

export default App;
