import React, { Component } from 'react';
import classes from './Controls.module.css';

class Controls extends Component {
    render() {
        const { Button, StartGame, Attack, SpecialAttack, Heal, GiveUp, Controls } = classes;

        let gameControls = (
                <button 
                    className={`${Button} ${StartGame}`}
                    onClick={this.props.start}>START NEW GAME</button>
        );
        // if gameStarted is true start game markup
        if (this.props.gameStarted){
            gameControls = (
                <div className="small-12 columns">
                    <button 
                        className={`${Button} ${Attack}`}
                        onClick={this.props.attacked}>ATTACK</button> 
                    <button className={`${Button} ${SpecialAttack}`}>SPECIAL ATTACK</button> 
                    <button className={`${Button} ${Heal}`}>HEAL</button> 
                    <button className={`${Button} ${GiveUp}`}>GIVE UP</button>
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