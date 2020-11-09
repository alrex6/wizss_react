import React, { Component } from 'react';
import {connect} from 'react-redux';
import {PROFILE, HOME} from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import SideNav from './sideNav';
import TopNav from './topNav';
import Post from './post';

class Ad extends Component {
    
    
    
    constructor(props){
        super(props);
        
        this.state = {
            inputs: {
                name: "",
                imgURL: "",
                btcAdd: ""
            }
        }

        this.createAd = this.createAd.bind(this);
    }

    createAd(){
        $.ajax({
            method: 'post',
            url:'http://localhost:3000/api/ad/newAd',
            
            data: {
                inputs: JSON.stringify(this.state.inputs)
            },
            success: (data) => {
                console.log("ad data:", data);
                
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

    render() {
        
        return (
            <div>
                <TopNav></TopNav>
                <SideNav></SideNav>
                <h1>Ads</h1>
                <Form>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input onChange = {(e) => {this.state.inputs.name = e.target.value}} type="text" name="name" id="name" placeholder="with a placeholder" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="imgURL">Image</Label>
                        <Input onChange = {(e) => {this.state.inputs.imgURL = e.target.value}} type="text" name="imgURL" id="imgURL" placeholder="password placeholder" />
                    </FormGroup>

                    <FormGroup>
                        <Label for="btcAdd">Bitcoin Address</Label>
                        <Input onChange = {(e) => {this.state.inputs.btcAdd = e.target.value}} type="text" name="btcAdd" id="btcAdd" placeholder="password placeholder" />
                    </FormGroup>

                    <Button onClick = {this.createAd}>Add</Button>
                </Form>
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
export default connect(mapStateToProps, mapDispatchToProps)(Ad);