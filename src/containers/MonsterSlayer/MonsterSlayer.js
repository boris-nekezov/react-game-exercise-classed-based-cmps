import React, { Component } from 'react';
import Players from '../../components/Players/Players';
import Controls from '../../components/Controls/Controls';
import Log from '../../components/Log/Log';

// create random number based on min and max
const calculateDamage = (min, max) => {
    return Math.max(Math.floor(Math.random() * max) + 1, min)
}

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
        const damage = calculateDamage(3, 10);
        const { turns, monsterHealthPoints } = this.state;

        const oldTurns = turns;
        const newTurn = {
            isPlayer: true, 
            text: 'Player hits Monster for' + damage    
        };
        const updatedTurns = [newTurn, ...oldTurns];
        
        let oldMonsterHP = monsterHealthPoints;
        const updatedMonsterHP = oldMonsterHP - damage;

        this.setState({
            turns: updatedTurns,
            monsterHealthPoints: updatedMonsterHP
        });

        // if checkwin is true then we return so we don't get to next line where monster attacks
        if(this.checkWin()) {
            return;
        }
        this.monsterAttackHandler(updatedTurns);
    }

    specialAttackHandler = () => {
        const damage = calculateDamage(10, 20);
        const { turns, monsterHealthPoints } = this.state;
        
        const oldTurns = turns;
        const newTurn = {
            isPlayer: true,
            text: 'Player hits Monster hard for ' + damage
        }
        const updatedTurns = [newTurn, ...oldTurns];

       
        let oldMonsterHP = monsterHealthPoints;
        const updatedMonsterHP = oldMonsterHP - damage;
        console.log('damage', damage, monsterHealthPoints, updatedMonsterHP);

        this.setState({
            turns: updatedTurns,
            monsterHealthPoints: updatedMonsterHP
        });

        if (this.checkWin()) {
            return;
        }

        this.monsterAttackHandler(oldTurns);
     
    }

    monsterAttackHandler = (oldTurns) => {
        const damage = calculateDamage(5, 12);
        const { playerHealthPoints } = this.state;        

        // set turns
        const newTurn = {
            isPlayer: false,
            text: 'Monster hits Player for ' + damage
        }
        const updatedTurns = [newTurn, ...oldTurns];
        
        // set players hp
        let oldPlayerHP = playerHealthPoints;
        const updatedPlayerHP = oldPlayerHP - damage;

        this.setState({
            playerHealthPoints: updatedPlayerHP,
            turns: updatedTurns
        })
    }

    checkWin = () => {
        const { playerHealthPoints, monsterHealthPoints } = this.state;

        // if player wins
        if (monsterHealthPoints <= 0) {
            if ( window.confirm('You won! New Game?') ) {
                this.startGameHandler();
            } else {
                this.setState({gameIsRunning: false});
            }
            return true; // there is win 
        // id monster wins
        } else if (playerHealthPoints <= 0) {
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
                    attacked={this.attackHandler}
                    specialAttacked={this.specialAttackHandler} />
                {/* if there are turns display log */}
                {this.state.turns.length > 0 ? <Log turnsLog={this.state.turns}/> : null}

            </div>
        );
    }
}

export default MonsterSlayer;