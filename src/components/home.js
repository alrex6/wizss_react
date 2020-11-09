import React, { Component } from 'react';
import {connect} from 'react-redux';
import {PROFILE, HOME} from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import SideNav from './sideNav';
import TopNav from './topNav';
import Post from './post';

class Home extends Component {
    
    
    constructor(props){
        super(props);
        console.log("HOME");
        console.log("userdata home: ", this.props.userData);
        this.props.userData.username = "hoy";
        console.log("user data new:", this.props.userData.username);
    }

    
    

    render() {
        
        return (
            <div>
                <TopNav></TopNav>
                <SideNav></SideNav>
                <h1>{this.props.userData.username}</h1>
            </div>
            
        
        );
    }
}

function mapStateToProps(state){
    console.log("state map", state);
    return {
        userData: state.user
        
    };
}

function mapDispatchToProps(dispatch){
    return {
        
        setUsername: (username) => {dispatch({type: 'SET_USERNAME', payload: username})}
    }
}
// connect(mapStateToProps)(Login);
export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default Home;