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

        
        this.setState({
            // set monster hp
            monsterHealthPoints: this.state.monsterHealthPoints -= damage,
            // add message at the log
            turns: [{
                isPlayer: true, 
                text: 'Player hits Monster for' + damage    
            },
                ...this.state.turns
            ]
            
        });
        console.log('monsterHealthPoints', this.state.monsterHealthPoints);
        console.log('turns', this.state.turns);
      
        // if checkwin is true then we return so we don't get to next line where monster attacks
        if(this.checkWin()) {
            return;
        }
        this.monsterAttackHandler();
    }

    monsterAttackHandler = () => {
        console.log('monster attacks!');
        let damage = this.calculateDamage(5, 12);

        // set players hp
        this.setState({
            playerHealthPoints: this.state.playerHealthPoints -= damage
        })
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