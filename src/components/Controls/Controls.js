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
                        onClick={() => this.props.attacked(3, 10)}>ATTACK</button> 
                    
                    <button 
                        className={`${Button} ${SpecialAttack}`}
                        onClick={() => this.props.attacked(5, 12)}>SPECIAL ATTACK</button> 
                    
                    <button 
                        className={`${Button} ${Heal}`}
                        onClick={this.props.healed}>HEAL</button> 
                    
                    <button 
                        className={`${Button} ${GiveUp}`}
                        onClick={this.props.gaveUp}>GIVE UP</button>
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