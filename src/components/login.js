import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import $ from 'jquery';
import {apiPath} from '../actionTypes';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Home from './home';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    
    
    registerInput = {
        username: "",
        password: ""
    }

    loginInput = {
        username: ""
    }
    constructor(props){
        super(props);
        console.log("userData", this.props.userData);
        this.userInput = this.props.userData;
        // this.userInput.username = "bangog";
        
        this.state = {
            userData: this.props.userData
            
        }

        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    register(){
        console.log("register");
       

        $.ajax({
            method: 'post',
            url: apiPath + 'user/register',
            
            data: {
                userData: JSON.stringify(this.registerInput)
            },
            success: function(data){
               console.log(data);
               
               
            },
            error: function(err){
               console.log(err);
            }
        });
        // this.props.setUsername()
    }

    login(){
        console.log("login");
        
        $.ajax({
            method: 'post',
            url: apiPath + 'user/login',
            
            data: {
                userData: JSON.stringify(this.loginInput)
            },
            success: (data) => {
                console.log("login data:", data);
                console.log(data.payload.username);
                this.props.userData.username = data.payload.username;
                localStorage.setItem('userData', JSON.stringify(this.props.userData));
                this.props.setUsername(data.payload.username);
            //    localStorage.setItem('userData', JSON.stringify(this.props.userData));
            //    this.props.userData.username = data.payload[0].username;
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

    render() {
        if(this.props.userData.username != ""){
            console.log("redurect");
            console.log("username", this.props.userData.username);
            return <Redirect to='/home' />
        }

        return (
            <div>
                
                {/* <Link to="/home">home</Link> */}
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Username</Label>
                        <Input onChange = {(e) => {this.registerInput.username = e.target.value}} type="text" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input onChange = {(e) => {this.registerInput.password = e.target.value}} type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </FormGroup>

                    <Button onClick = {this.register}>Register</Button>
                </Form>

                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Username</Label>
                        <Input onChange = {(e) => {this.loginInput.username = e.target.value}} type="text" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </FormGroup>
                    <Button onClick = {() => {this.props.setUsername('biga')}}>set</Button>
                    <Button onClick = {this.login}>Login</Button>
                </Form>
            </div>
            
        
        );
    }
}

// mapStateToProps = (state) => ({
    
//     counter: state.counter
    
// })

function mapStateToProps(state){
    console.log("state map", state);
    return {
        userData: state.user
        
    };
}

function mapDispatchToProps(dispatch){
    return {
        // increaseCounter: () => {dispatch({type: 'INCREASE_COUNTER'})},
        // decreaseCounter: () => {dispatch({type: 'DECREASE_COUNTER'})},
        setUsername: (username) => {dispatch({type: 'SET_USERNAME', payload: username})}
    }
}
// connect(mapStateToProps)(Login);
export default connect(mapStateToProps, mapDispatchToProps)(Login);