import React, { Component } from 'react';
import classes from './HealthBar.module.css';

class HealthBar extends Component {
    render() {
        return (
            <div className={classes.HealthBar}>
                <div
                    className={[classes.HealthBar, 'text-center'].join(' ')}
                    style={{
                        backgroundColor: 'green',
                        margin: '0',
                        color: 'white'
                    }}>
                    100 hp make this dynamic later
                </div>
            </div>
        );
    }
}

export default HealthBar;
