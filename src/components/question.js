import React, { Component } from 'react';
import {connect} from 'react-redux';
import {PROFILE, HOME, apiPath} from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText, Table, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import SideNav from './sideNav';
import TopNav from './topNav';
import Post from './post';

class Question extends Component {
    
    
    
    constructor(props){
        super(props);
        
        this.state = {
            questions: [],
            inputs: {
                level: 0,
                answer: "",
                questionURL: "",
                duration: 0,
                id: 0

            }
        }

        this.toggle = this.toggle.bind(this);
        this.newQuestion = this.newQuestion.bind(this);
        this.processForm = this.processForm.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }



    componentDidMount(){
        $.ajax({
            method: 'get',
            url: apiPath + 'questionLevel/getAllQuestions',
            
            
            success: (data) => {
               console.log("quuestions data: ", data);
               this.setState({questions: data.data});
            //    console.log("question levels: ", this.state.questionLevels);
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });                   
    }

    convertToDate(timestamp){
        let timestampDate = new Date(timestamp * 1000);
        let hours = timestampDate.getHours();
        let minutes = timestampDate.getMinutes();
        let seconds = timestampDate.getSeconds();
        let year = timestampDate.getFullYear();
        let month = timestampDate.getMonth() + 1;
        let date = timestampDate.getDate();  
        
        return month + " " + date + ", " + year + " " + hours + ":" + minutes + ":" + seconds; 
    }

    clearInputs(){
        this.state.inputs.level = 0;
        this.state.inputs.questionURL = "";
        this.state.inputs.answer = "";
        this.state.inputs.duration = 0;
        this.state.inputs.id = 0;
    }

    newQuestion(){
        this.clearInputs();
        this.toggle();   
    }

    submitNewQuestion(){
        $.ajax({
            method: 'post',
            url: apiPath + 'questionLevel/newQuestion',
            data: {
                inputs: JSON.stringify(this.state.inputs)
            },
            
            success: (data) => {
               console.log("new question data: ", data);
            //    this.setState({questions: data.data});
            //    console.log("question levels: ", this.state.questionLevels);
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });       
    }

    processForm(){
        if(this.state.inputs.id == 0){
            this.submitNewQuestion();
        }else{
            this.editQuestion();
        }
    }

    transferValueToModal(question){
        this.state.inputs.questionURL = question.questionurl;
        this.state.inputs.answer = question.answer;
        this.state.inputs.level = question.level;
        this.state.inputs.duration = question.duration;
        this.state.inputs.id = question.id;
        this.toggle();
    }

    editQuestion(){
        $.ajax({
            method: 'post',
            url: apiPath + 'questionLevel/editQuestion',
            data: {
                inputs: JSON.stringify(this.state.inputs)
            },
            
            success: (data) => {
               console.log("new question data: ", data);
            //    this.setState({questions: data.data});
            //    console.log("question levels: ", this.state.questionLevels);
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
        return (
            <div>
                <TopNav></TopNav>
                <SideNav></SideNav>
                <h1>Question</h1>
                <Button color="danger" onClick={this.newQuestion}>New Question</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="questionURL">Question URL</Label>
                                <Input onChange = {(e) => {this.setState({inputs: {...this.state.inputs, questionURL: e.target.value}})}} value = {this.state.inputs.questionURL} type="text" name="email" id="questionURL" placeholder="with a placeholder" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="answer">Answer</Label>
                                <Input onChange = {(e) => {this.setState({inputs: {...this.state.inputs, answer: e.target.value}})}} value = {this.state.inputs.answer} type="text" name="email" id="answer" placeholder="with a placeholder" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="level">Level</Label>
                                <Input onChange = {(e) => {this.setState({inputs: {...this.state.inputs, level: e.target.value}})}} value = {this.state.inputs.level} type="text" name="email" id="level" placeholder="with a placeholder" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="duration">Duration</Label>
                                <Input onChange = {(e) => {this.setState({inputs: {...this.state.inputs, duration: e.target.value}})}} value = {this.state.inputs.duration} type="text" name="email" id="duration" placeholder="with a placeholder" />
                            </FormGroup>
                            
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.processForm}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <div>
                    <Table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Answer</th>
                            <th>Level</th>
                            <th>Duration</th>
                            <th>Available</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        {this.state.questions.map((question, index) => 
                            <tr onClick={() => {this.transferValueToModal(question)}} key = {index}>
                                <td>{question.id}</td>
                                <td>{question.answer}</td>
                                <td>{question.level}</td>
                                <td>{question.duration}</td>
                                <td>{this.convertToDate(question.available)}</td>
                            </tr> 
                        )}
                        </tbody>
                    </Table>
                    
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
export default connect(mapStateToProps, mapDispatchToProps)(Question);