import React,  { Component } from 'react';
import HealthBar from './HealthBar/HealthBar';

class Players extends Component {
    state = {
        playerHealthPoints: 100,
        monsterHealthPoints: 100
    }
    render(){
        return (    
            <section className="row">
            <div className="small-6 columns">
                <h1 className="text-center">YOU</h1>
                <HealthBar />   
            </div>
            <div className="small-6 columns">
                <h1 className="text-center">MONSTER</h1>
                <HealthBar />
            </div>
        </section>
        );
    }
}

export default Players;