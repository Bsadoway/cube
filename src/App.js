import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid';
import BasicGrid from './components/BasicGrid';
import GameOver from './components/GameOver';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      game: ()=><Grid endGame={this.endGame} />,
      gameOver: false,
      lives: 3,
      total: 0,
      lockedGifts: [],
      basicGrid: false
    };
  }

  endGame = (lives, total, lockedGifts) =>{
    this.setState({gameOver:true, lives: lives, total:total, lockedGifts: lockedGifts});
  }

  newGame = () => {
    this.setState({
      game: () => <Grid endGame={this.endGame} />,
      gameOver: false,
    });
  }

  basicSwitch = () => {
    this.setState({basicGrid:true});
  }

  render() {
    const ActiveGame = this.state.game;
    return (
      <div className="game-area">
        {this.state.gameOver ? <GameOver reset={this.newGame} lives={this.state.lives} total={this.state.total} gifts={this.state.lockedGifts}/> : "" }
        <ActiveGame />
      </div>

    );
  }
}

export default App;
