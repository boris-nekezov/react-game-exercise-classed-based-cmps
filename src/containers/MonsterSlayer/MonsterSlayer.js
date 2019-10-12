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
      
        const oldTurns = [this.state.turns];
        console.log('oldTurns', oldTurns);

        let newTurn = {
            isPlayer: true, 
            text: 'Player hits Monster for' + damage    
        };
        console.log('newTurn', newTurn);

        let updatedTurns = [...this.state.turns];

        updatedTurns.unshift(newTurn);

        console.log('updatedTurns', updatedTurns);
        this.setState({
            turns: updatedTurns
        })
        console.log('turns after', this.state.turns);
        // old turns
        // new turn
        // updated turns
        // setState turns: updatedTurns

        // this.setState({
        //     // set monster hp
        //     monsterHealthPoints: this.state.monsterHealthPoints -= damage,
        //     // add message at the log
        //     turns: [{
        //         isPlayer: true, 
        //         text: 'Player hits Monster for' + damage    
        //     },
        //     // and add the rest of the objects left in the turns array
        //         ...this.state.turns
        //     ]
            
        // });

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
            playerHealthPoints: this.state.playerHealthPoints -= damage,
            // add message at the log
            // turns: [{
            //     isPlayer: false,
            //     text: 'Monster hits Player for ' + damage
            // },
            // // and add the rest of the objects left in the turns array
            //     ...this.state.turns
            // ]
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
                {this.state.turns.length > 0 ? <Log turnsLog={this.state.turns}/> : null}

            </div>
        );
    }
}

export default MonsterSlayer;