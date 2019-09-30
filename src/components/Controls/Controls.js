import React, { Component } from 'react';
import classes from './Controls.module.css';

class Controls extends Component {
    render() {
        let gameControls = (
                <button 
                    className={[classes.Button, classes.StartGame].join(' ')}
                    onClick={this.props.start}>START NEW GAME</button>
        );
        // if gameStarted is true start game markup
        if (this.props.gameStarted){
            console.log('Started!');
            gameControls = (
                <div className="small-12 columns">
                    <button className={[classes.Button, classes.Attack].join(' ')}>ATTACK</button> 
                    <button className={[classes.Button, classes.SpecialAttack].join(' ')}>SPECIAL ATTACK</button> 
                    <button className={[classes.Button, classes.Heal].join(' ')}>HEAL</button> 
                    <button className={[classes.Button, classes.GiveUp].join(' ')}>GIVE UP</button>
                </div>
            );
        } 

        return (
            <section className={['row', classes.Controls].join(' ')}>
                {gameControls}
            </section>
        );
    }
}

export default Controls;