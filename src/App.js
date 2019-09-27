import React from 'react';
import logo from './logo.svg';
import Players from './components/Players/Players';

function App() {
  return (
    <div className="App">
        Monster Slayer

        <Players />

      <section className="row controls">
          <div className="small-12 columns">
            <button id="attack">ATTACK</button> 
            <button id="special-attack">SPECIAL ATTACK</button> 
            <button id="heal">HEAL</button> 
            <button id="give-up">GIVE UP</button>
          </div>
      </section>
      
      <section className="row log">
          <div className="small-12 columns">
              <ul>
                  <li className="monster-turn">
                      Monster hits Player for 9
                  </li>
              </ul>
          </div>
      </section>





    </div>
    // /.App
  );
}

export default App;
