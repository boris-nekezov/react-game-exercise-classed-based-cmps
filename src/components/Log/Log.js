import React, { Component } from 'react';
import classes from './Log.module.css';

class Log extends Component {

    
    render() {
        const { Log, PlayerTurn, MonsterTurn } = classes;
        const { turnsLog } = this.props;
       

        return (
            <section className={`row ${Log}`}>
                <div className="small-12 columns">
                    <ul>
                        {turnsLog.map((turn, index) => (
                            <li key={index} className={turn.isPlayer ? PlayerTurn : MonsterTurn}>
                                some turn {turn.text}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        );
    };
}

export default Log;