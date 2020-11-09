import React, { Component } from 'react';
import {connect} from 'react-redux';
import {PROFILE, HOME, apiPath} from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText, Table, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import SideNav from './sideNav';
import TopNav from './topNav';
import Post from './post';

class QuestionLevel extends Component {
    
    
   
    constructor(props){
        super(props);

        this.state = {
            questionLevels: [],
            modal: false,
            inputs: {
                dateAppear: 0,
                showtime: 0,
                appearInterval: 0,
                questionID: 0,
                id: 0
            }
        }

        this.toggle = this.toggle.bind(this);
        this.transferValueToModal = this.transferValueToModal.bind(this);
        this.editQuestionLevel = this.editQuestionLevel.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    componentDidMount(){
        $.ajax({
            method: 'get',
            url: apiPath + 'questionLevel/getAllQuestionLevels',
            
            
            success: (data) => {
               console.log("follow data: ", data);
               this.setState({questionLevels: data.data});
               
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });                   
    }

    transferValueToModal(questionLevel){
        console.log("transfer to modal");
        this.state.inputs.showtime = questionLevel.showtime;
        this.state.inputs.dateAppear = questionLevel.dateappear;
        this.state.inputs.questionID = questionLevel.questionid;
        this.state.inputs.id = questionLevel.id;
        this.toggle();
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

    editQuestionLevel(){
        
        $.ajax({
            method: 'post',
            url: apiPath + 'questionLevel/editQuestionLevel',
            data: {
                inputs: JSON.stringify(this.state.inputs)
            },  
            
            success: (data) => {
               console.log("data: ", data);
               
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        }); 
        this.toggle();    
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
                {/* <Button color="danger" onClick={this.toggle}>New Question Level</Button> */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Showtime</Label>
                                <Input onChange = {(e) => {this.setState({inputs: {...this.state.inputs, showtime: e.target.value}})}} value = {this.state.inputs.showtime} type="text" name="email" id="exampleEmail" placeholder="with a placeholder" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="dateAppear">Date Appear</Label>
                                <Input onChange = {(e) => {this.setState({inputs: {...this.state.inputs, dateAppear: e.target.value}})}} value = {this.state.inputs.dateAppear} type="text" name="email" id="dateAppear" placeholder="with a placeholder" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="questionID">Question ID</Label>
                                <Input onChange = {(e) => {this.setState({inputs: {...this.state.inputs, questionID: e.target.value}})}} value = {this.state.inputs.questionID} type="text" name="email" id="questionID" placeholder="with a placeholder" />
                            </FormGroup>
                            
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {this.editQuestionLevel()}}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <h1>Question Level</h1>
                <div>
                    <Table>
                        <thead>
                        <tr>
                            <th>Level</th>
                            <th>Date Appear</th>
                            <th>Showtime</th>
                            <th>Appear Interval</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        {this.state.questionLevels.map((questionLevel, index) => 
                            <tr onClick={() => {this.transferValueToModal(questionLevel)}} key = {index}>
                                <td>{questionLevel.level}</td>
                                <td>{this.convertToDate(questionLevel.dateappear)}</td>
                                <td>{questionLevel.showtime}</td>
                                <td>{questionLevel.appearinterval}</td>
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
export default connect(mapStateToProps, mapDispatchToProps)(QuestionLevel);