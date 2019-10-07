import React, { Component } from 'react';
import Players from '../../components/Players/Players';
import Controls from '../../components/Controls/Controls';
import Log from '../../components/Log/Log';

class MonsterSlayer extends Component {
    state = {
        playerHealthPoints: 100,
        monsterHealthPoints: 100,
        gameIsRunning: false,
        turns: []
    }

    startGameHandler = () => {
        this.setState({
            gameIsRunning: true,
            playerHealthPoints: 100,
            monsterHealthPoints: 100,
            turns: []
        });
    }

    attackHandler = () => {
        let damage = this.calculateDamage(3, 10);
        this.state.monsterHealthPoints -= damage;
    }

    // create random number based on min and max
    calculateDamage = (min, max) => {
        return Math.max(Math.floor(Math.random() * max) + 1, min)
    }

    checkWin = () => {
        // if player wins
        if (this.state.monsterHealthPoints <= 0) {
            if ( window.confirm('You won! New Game?') ) {
                this.startGameHandler();
            } else {
                this.setState({gameIsRunning: false});
            }
            return true; // there is win 
        // id monster wins
        } else if (this.state.playerHealthPoints <= 0) {
            if ( window.confirm('You Lost! New Game?')) {
                this.startGameHandler();
            } else {
                this.setState({gameIsRunning: false});
            }
            return true; // there is win
        }
        return false; // no win
    } 

    render () {
        return (
            <div>
                Monster Slayer
                <Players 
                    playerHP={this.state.playerHealthPoints}
                    monsterHP={this.state.monsterHealthPoints} />
                <Controls 
                    gameStarted={this.state.gameIsRunning} 
                    start={this.startGameHandler}
                    attacked={this.attackHandler} />
                {/* if there are turns display log */}
                {this.state.turns.length > 0 ? <Log /> : null}

            </div>
        );
    }
}

export default MonsterSlayer;