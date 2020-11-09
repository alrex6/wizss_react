import React, { Component } from 'react';
import {connect} from 'react-redux';
import {SET_USERNAME} from '../actionTypes';

import $ from 'jquery';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './home';

import Login from './login';
import Level from './level';
import QuestionLevel from './questionLevel';
import Question from './question';
import Ad from './ad';

class Whole extends Component {
    
    
    
    constructor(props){
        super(props);
        this.getProfile();
    }

    getProfile(){
        console.log("get Profile");
        let userData = JSON.parse(localStorage.getItem('userData')); 
         
        if(userData == null){
            this.props.setUsername("");
        }else{
            this.props.setUsername(userData.username);
        }
    }

    componentDidMount(){
        
                               
    }

    render() {
        return (
            <div>
                <Router>
                    <div>
                        
                        <Route exact path="/" component={Home} />
                        <Route path="/home" component={Home} />
                        <Route path="/level" component={Level} />
                        <Route path="/login" component={Login} />
                        <Route path="/questionlevel" component={QuestionLevel} />
                        <Route path="/question" component={Question} />
                        <Route path="/ad" component={Ad} />
                    </div>
                    
                </Router>
            </div>
            
        
        );
    }
}

function mapStateToProps(state){
    console.log("state map", state);
    return {
        posts: state.post.posts,
        username: state.user.username
    };
}

function mapDispatchToProps(dispatch){
    return {
        // increaseCounter: () => {dispatch({type: 'INCREASE_COUNTER'})},
        // decreaseCounter: () => {dispatch({type: 'DECREASE_COUNTER'})},
        setUsername: (username) => {dispatch({type: SET_USERNAME, payload: username})}
    }
}
// connect(mapStateToProps)(Login);
export default connect(mapStateToProps, mapDispatchToProps)(Whole);