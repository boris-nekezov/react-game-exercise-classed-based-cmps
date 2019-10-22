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

    attackHandler = (min, max) => {
        const { turns, monsterHealthPoints, playerHealthPoints } = this.state;
        const playerDamage = calculateDamage(min, max);
        const monsterDamage = calculateDamage(5, 12);
        const oldTurns = turns;
        const oldPlayerHP = playerHealthPoints;
        const oldMonsterHP = monsterHealthPoints;

        const playerNewTurn = {
            isPlayer: true, 
            text: `Player hits Monster for ${playerDamage}`    
        };
        const monsterNewTurn = {
            isPlayer: false,
            text: `Monster hits Player for ${monsterDamage}`
        }
        
        const updatedTurns = [playerNewTurn, monsterNewTurn, ...oldTurns];
        const updatedPlayerHP = oldPlayerHP - monsterDamage;
        const updatedMonsterHP = oldMonsterHP - playerDamage;

        // if checkwin is true then we return so we don't get to next line where monster attacks
        if(this.checkWin(updatedPlayerHP, updatedMonsterHP)) {
            return;
        }

        this.setState({
            turns: updatedTurns,
            playerHealthPoints: updatedPlayerHP,
            monsterHealthPoints: updatedMonsterHP
        });
    }

    heal = () => {
        let { turns, playerHealthPoints } = this.state;
        if (playerHealthPoints <= 90) {
            const healSize = 10
            const monsterDamage = calculateDamage(5, 12);
            const oldTurns = turns;

            const playerNewTurn = {
                isPlayer: true,
                text: `Player heals himself for ${healSize}`
            }

            const monsterNewTurn = {
                isPlayer: false,
                text: `Monster hits Player for ${monsterDamage}`
            }

            const updatedTurns = [playerNewTurn, monsterNewTurn, ...oldTurns];

            this.setState({ 
                playerHealthPoints: (playerHealthPoints += 10) - monsterDamage,
                turns: updatedTurns
            });   
        }
      
    }

    giveUp = () => {
        this.setState({ gameIsRunning: false });
    }

    checkWin = (playerHP, monsterHP) => {
            // if player wins
            if (monsterHP <= 0) {
                if ( window.confirm('You won! New Game?') ) {
                    this.startGameHandler();
                } else {
                    this.setState({gameIsRunning: false});
                }
                return true; // there is win 
            // id monster wins
            } else if (playerHP <= 0) {
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
        const { playerHealthPoints, monsterHealthPoints, gameIsRunning, turns } = this.state;
        return (
            <div>
                <Players 
                    playerHP={playerHealthPoints}
                    monsterHP={monsterHealthPoints} />
                <Controls 
                    gameStarted={gameIsRunning} 
                    start={this.startGameHandler}
                    attacked={this.attackHandler}
                    specialAttacked={this.specialAttackHandler} 
                    healed={this.heal}
                    gaveUp={this.giveUp} /> 
                {/* if there are turns display log */}
                {turns.length > 0 ? <Log turnsLog={turns}/> : null}

            </div>
        );
    }
}

export default MonsterSlayer;