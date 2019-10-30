import React, { Component } from 'react';
import classes from './Controls.module.css';
import STATS from '../../utils/stats';

const { damage, bigDamage } = STATS;

class Controls extends Component {
    render() {
        const { Button, StartGame, Attack, SpecialAttack, Heal, GiveUp, Controls } = classes;
        const { start, attacked, healed, gaveUp, gameStarted } = this.props;
        let gameControls = (
            <button 
                className={`${Button} ${StartGame}`}
                onClick={start}>START NEW GAME</button>
        );
        // if gameStarted is true start game markup
        if (gameStarted){
            gameControls = (
                <div className="small-12 columns">
                    {/* atack */}
                    <button 
                        className={`${Button} ${Attack}`}
                        onClick={() => attacked(...damage)}>ATTACK</button> 
                    {/* special attack */}
                    <button 
                        className={`${Button} ${SpecialAttack}`}
                        onClick={() => attacked(...bigDamage)}>SPECIAL ATTACK</button>
                    {/* heal */}
                    <button 
                        className={`${Button} ${Heal}`}
                        onClick={healed}>HEAL</button> 
                    {/* give up */}
                    <button 
                        className={`${Button} ${GiveUp}`}
                        onClick={gaveUp}>GIVE UP</button>
                </div>
            );
        } 

        return (
            <section className={`row ${Controls}`}>
                {gameControls}
            </section>
        );
    }
}

export default Controls;