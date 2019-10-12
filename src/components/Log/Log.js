import React, { Component } from 'react';
import classes from './Log.module.css';

class Log extends Component {
    logMethod = () => {
        // console.log('this.props.turnsLog', this.props.turnsLog);
    }
    
    render() {
        return (
            <section className={["row", classes.Log].join(' ')}>
                <div className="small-12 columns">
                    <div></div>
                    
                    <ul onClick={this.logMethod()}>
                        {this.props.turnsLog.map((turn, index) => (
                            <li key={index}>
                                some turn
                            </li>
                        ))}
                        <li className={classes.MonsterTurn}>
                                    Monster hits Player for 9
                                </li>
                                <li className={classes.PlayerTurn}>
                                    Monster hits Player for 9
                                </li>
                    </ul>
                </div>
            </section>
        );
    };
}

export default Log;