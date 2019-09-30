import React, { Component } from 'react';
import classes from './Log.module.css';

class Log extends Component {
    render() {
        return (
            <section className={["row", classes.Log].join(' ')}>
                <div className="small-12 columns">
                    <ul>
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