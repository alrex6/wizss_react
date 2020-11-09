import React, { Component } from 'react';
import {connect} from 'react-redux';
import {PROFILE, HOME, apiPath} from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import SideNav from './sideNav';
import TopNav from './topNav';
import Post from './post';

class Level extends Component {
    
    
    registerInput = {
        username: ""
    }

    loginInput = {
        username: ""
    }

    adOrQuestionID = 0;
    timerID = 0;
    constructor(props){
        super(props);
        this.state = {
            isShowingQuestion: false,
            questionURL: "",
            ad: null,
            timerDuration: 0,
            inputs: {
                answer: ""
            }
        }

        this.submitAnswer = this.submitAnswer.bind(this);
        console.log("this.props.userdata: ", this.props.userData.username);
    }

    componentDidMount(){
        
           
        this.getQuestionOrAd();
    }

    getQuestionOrAd(){
        $.ajax({
            method: 'get',
            url: apiPath + 'questionLevel/getQuestionLevel',
            
            
            success: (data) => {
                console.log("get question level data: ", data);
                if(data.status == 1){
                    if(data.code == 1){
                        // this.stopGetQuestionOrAd();
                        this.showQuestion(data.data);                
                    }else{
                        this.showAd();    
                    }
                }
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        }); 
    }

    startGetQuestionOrAd(){
        
        this.adOrQuestionID = setTimeout(() => {
            this.getQuestionOrAd();
        }, 5000);
    }

    stopGetQuestionOrAd(){
        clearInterval(this.adOrQuestionID);
          
    }

    showAd(){
        
        this.startGetQuestionOrAd();
    }

    startTimer(){
        this.timerID = setTimeout(() => {
            this.setState({timerDuration: this.state.timerDuration - 1});
            if(this.state.timerDuration == 0){
                // this.stopTimer();
                this.setState({isShowingQuestion: false});
                this.getQuestionOrAd();
            }else{
                this.startTimer();
            }
        }, 1000);

    }

    stopTimer(){
        clearInterval(this.timerID);   
    }

    showQuestion(inputs){
        this.setState({isShowingQuestion: true});
        console.log("show question");
        let timeNow = Math.round(new Date().getTime() / 1000);
        let duration = inputs.duration - timeNow;
        console.log("timenow: ", timeNow);
        console.log("inputs duration: ", inputs.duration);
        console.log("duration: ", duration);
        this.state.questionURL = inputs.questionURL;
        this.state.timerDuration = duration;
        
        
        this.startTimer();
    }

    submitAnswer(){
        $.ajax({
            method: 'post',
            url: apiPath + 'questionLevel/submitAnswer',
            data: {
                answer: this.state.inputs.answer,
                level: 1
            },  
            
            success: (data) => {
                console.log("answer", data);
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        }); 
    }

    render() {
        // if(this.props.userData.username == ""){
        //     console.log("redurect");
        //     console.log("username", this.props.userData.username);
        //     return <Redirect to='/login' />
        // }
        let questionOrAdDiv = <div id = "adDiv">
            Ad
        </div>;
        if(this.state.isShowingQuestion){
            questionOrAdDiv = <div id = "questionDiv">
                {this.state.questionURL}<br/>
                timer: {this.state.timerDuration}
                <Form>
                   
                    <FormGroup>
                        <Label for="answer">Answer</Label>
                        <Input onChange = {(e) => {this.state.inputs.answer = e.target.value}} type="text" name="answer" id="answer" placeholder="password placeholder" />
                    </FormGroup>

                    <Button onClick = {this.submitAnswer}>Submit</Button>
                </Form>            
            </div>;
        }
        return (
            <div>
                <TopNav></TopNav>
                <SideNav></SideNav>
                <div>
                    {questionOrAdDiv}    
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Level);