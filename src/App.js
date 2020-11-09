import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'

import Whole from './components/whole';
import Home from './components/home';
import Profile from './components/profile';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import store from './store';



class App extends Component {
  render() {
    return (
      
      <Provider store = {store}>
        <Whole></Whole>
        {/* <Router>
            <div>
                
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/profile" component={Profile} />
            </div>
            
        </Router> */}
        
      </Provider>
     
    );
  }
}

export default App;
