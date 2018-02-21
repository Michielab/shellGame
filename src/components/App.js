import React, { Component } from "react";
import styles from "./App.css";
import Shell from "./Shell";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shellOne: 450,
      shellTwo: 750,
      shellThree: 1050,
      positionY: 350,
      positionBall: 850,
      displayBall: "",
      game: { started: false, score: 0, colors: ["green", "green", "green"] }
    };
  }

  /*Method to start the game */
  startGame = (difficulty, ...rest) => {
    let colors = this.state.game.colors;
    rest.length === 0 ? "" : (colors = rest);
    this.moveBall();
    setTimeout(() => {
      this.setState(
        {
          positionY: 500,
          displayBall: "none",
          game: {
            ...this.state.game,
            started: true,
            speed: difficulty,
            colors
          },
          locationBall: this.getLocationBall(this.state.positionBall - 100)
        },
        () => {
          this.swapShells();
        }
      );
    }, 1000);
  };

  /*Method to randomly move the ball */
  moveBall = () => {
    let { shellOne, shellTwo, shellThree } = this.state;
    let array = [shellOne, shellTwo, shellThree];
    let number = Math.floor(Math.random() * array.length);
    this.setState({ positionBall: array[number] + 100 });
  };

  /*Method to find the location of the ball */
  getLocationBall = value => {
    return Object.keys(this.state).find(key => this.state[key] === value);
  };

  /*Method to move shells */
  swapShells = () => {
    let count = 0;
    let shellOne = this.state.shellOne;
    let shellTwo = this.state.shellTwo;
    let shellThree = this.state.shellThree;
    let swap = setInterval(() => {
      count++;
      count === 10
        ? this.stopSwapping(swap, shellOne, shellTwo, shellThree)
        : this.setState({
            shellOne: this.randomNumber(),
            shellTwo: this.randomNumber(),
            shellThree: this.randomNumber()
          });
    }, this.state.game.speed);
  };

  /*Method to generate random numbers */
  randomNumber = () => {
    return Math.floor(Math.random() * 600) + 450;
  };

  /*Method to clear Interval and setting shells to "good" positions */
  stopSwapping = (swap, ...rest) => {
    let originalPositions = rest;
    let positions = {};
    clearInterval(swap);
    let shells = [
      { name: "shellOne", position: this.state.shellOne },
      { name: "shellTwo", position: this.state.shellTwo },
      { name: "shellThree", position: this.state.shellThree }
    ];
    shells.sort((a, b) => a.position > b.position);
    originalPositions.map((el, index) => (positions[shells[index].name] = el));
    this.setState({
      ...positions,
      displayBall: "",
      positionBall: positions[this.state.locationBall] + 100
    });
  };

  /*Method to lift the shells */
  reveal = event => {
    let shell = event.target.getAttribute("name");
    this.setState({ positionY: 350 });
    this.checkForBall(shell) ? this.newGame() : this.gameOver();
  };

  /*Method to check if the ball is inside the shell */
  checkForBall = shell => {
    return shell === this.state.locationBall;
  };

  /*Method to add points to the score and restart game */
  newGame = () => {
    let score = this.state.game.score;
    score++;
    this.setState({ game: { ...this.state.game, score } });
    setTimeout(() => {
      this.startGame(this.state.game.speed);
    }, 3000);
  };

  /*Method to end the game */
  gameOver = () => {
    setTimeout(() => {
      this.setState({
        game: {
          started: false,
          score: 0,
          colors: ["green", "green", "green"]
        }
      });
    }, 3000);
  };

  render() {
    const {
      shellOne,
      shellTwo,
      shellThree,
      positionY,
      positionBall,
      displayBall,
      game
    } = this.state;
    return (
      <div className={styles.wrapper}>
        {game.started ? (
          <h1>Your score: {game.score}</h1>
        ) : (
          <div className={styles.wrapperButtons}>
            <h1>Hi welcome to the shell game, select your level to start!</h1>
            <button
              onClick={() => this.startGame(1000, "green", "blue", "red")}
            >
              Jedi Trainee
            </button>
            <button onClick={() => this.startGame(500)}>Jedi Knight</button>
            <button onClick={() => this.startGame(100)}>Jedi Master</button>
          </div>
        )}
        <svg align="center" height="500" width="100%">
          <circle
            cx={positionBall}
            cy="450"
            r="50"
            stroke="red"
            fill="red"
            display={displayBall}
          />
          <Shell
            positionX={shellOne}
            positionY={positionY}
            reveal={this.reveal}
            color={game.colors[0]}
            name="shellOne"
          />
          <Shell
            positionX={shellTwo}
            positionY={positionY}
            reveal={this.reveal}
            color={game.colors[1]}
            name="shellTwo"
          />
          <Shell
            positionX={shellThree}
            positionY={positionY}
            reveal={this.reveal}
            color={game.colors[2]}
            name="shellThree"
          />
        </svg>
      </div>
    );
  }
}

export default App;
