import React, { Component } from 'react';
import classes from './HealthBar.module.css';

class HealthBar extends Component {
    render() {
        const { HealthBar } = classes;
        const { healthPoints } = this.props;
        return (
            <div className={HealthBar}>
                <div
                    className={`${HealthBar} text-center`}
                    style={{
                        backgroundColor: 'green',
                        margin: '0',
                        color: 'white',
                        width: `${healthPoints}%`
                    }}>
                    {healthPoints}
                </div>
            </div>
        );
    }
}

export default HealthBar;
