import React, { Component } from 'react';
import './App.css';
import SoldiersList from './pages/soldiersList';
import AddNewSolider from './pages/addSolider';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={SoldiersList} />
          <Route exact path="/addNewSolider/:index" component={AddNewSolider} />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
