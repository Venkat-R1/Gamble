import React from 'react';
import Player from './Players.js';
import Result from './Result.js';
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <div >
      
      <Router>
          <Route path ="/result" component ={Result} />
          <Route path="/" exact component={Player} />  
          
        
      </Router>
    </div>
  );
}

export default App;
