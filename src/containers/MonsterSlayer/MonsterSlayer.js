import React, { Component } from 'react';
import Players from '../../components/Players/Players';
import Controls from '../../components/Controls/Controls';
import Log from '../../components/Log/Log';
// utils
import STATS from '../../utils/stats';
import calculateDamage from '../../utils/calculateDamage';
import generateTurn from '../../utils/generateTurn';

const {
    gameIsRunning,
    playerHealthPoints,
    monsterHealthPoints,
    turns,
    healSize,
    bigDamage
} = STATS;

class MonsterSlayer extends Component {
    state = {
        gameIsRunning,
        playerHealthPoints,
        monsterHealthPoints,
        turns
    }

    startGameHandler = () => {
        this.setState({
            gameIsRunning: !gameIsRunning,
            playerHealthPoints,
            monsterHealthPoints,
            turns
        });
    }

    attackHandler = (min, max) => {
        const { turns, monsterHealthPoints, playerHealthPoints } = this.state;
        const playerDamage = calculateDamage(min, max);
        const monsterDamage = calculateDamage(...bigDamage);
        
        const playerNewTurn = generateTurn(true, 'playerHits', playerDamage);
        const monsterNewTurn = generateTurn(false, 'monsterHits', monsterDamage);

        // const updatedTurns = ;
        const updatedPlayerHP = playerHealthPoints - monsterDamage;
        const updatedMonsterHP = monsterHealthPoints - playerDamage;

        // if checkwin is true then we return so we don't get to next line where monster attacks
        if(this.checkWin(updatedPlayerHP, updatedMonsterHP)) {
            return;
        }

        this.setState({
            playerHealthPoints: updatedPlayerHP,
            monsterHealthPoints: updatedMonsterHP,
            turns: [playerNewTurn, monsterNewTurn, ...turns]
        });
    }

    heal = () => {
        let { turns, playerHealthPoints } = this.state;
        if (playerHealthPoints <= 90) {
            const monsterDamage = calculateDamage(...bigDamage);

            const playerNewTurn = generateTurn(true, 'playerHeals', healSize);
            const monsterNewTurn = generateTurn(false, 'monsterHits', monsterDamage);

            this.setState({ 
                playerHealthPoints: (playerHealthPoints += healSize) - monsterDamage,
                turns: [playerNewTurn, monsterNewTurn, ...turns]
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
                    healed={this.heal}
                    gaveUp={this.giveUp} /> 
                {/* if there are turns display log */}
                {turns.length > 0 ? <Log turnsLog={turns}/> : null}

            </div>
        );
    }
}

export default MonsterSlayer;