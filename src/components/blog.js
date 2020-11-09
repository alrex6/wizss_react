import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import TopNav from './topNav';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

class Blog extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            post: this.props.post,
            editing: false,
            editPost: this.props.post.post
        }

        
        this.editPost = this.editPost.bind(this);
    }

    editPost(){
        this.props.post.post = this.state.editPost; 
        this.setState({post: this.props.post, editing: false});

        
    }

    render() {
        if(!this.props.post.render){
            return null;
        }
        console.log("post:", this.props.post);
        let cardBody = <CardBody>
            <CardTitle>{this.props.post.creator}</CardTitle>
            {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
            <CardText>{this.props.post.post}</CardText>
            <CardText>{this.props.post.id}</CardText>
            <Button onClick = {() => {this.props.showReplies(this.props.post)}}>Show</Button>
            <Button onClick = {() => {this.setState({editing: true})}}>Edit</Button>
        </CardBody>;

        if(this.state.editing){
            cardBody = <CardBody>
                <CardTitle>{this.state.post.creator}</CardTitle>
                {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                <FormGroup>
                    <Label for="exampleText">Edit</Label>
                    <Input onChange = {(e) => {this.setState({editPost: e.target.value})}} value = {this.state.editPost} type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <Button onClick = {this.editPost}>Ok</Button>
                
            </CardBody>;
        }
        return (
            <div>
                <Card>
                    {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
                    {cardBody}
                    
                </Card>
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
export default connect(mapStateToProps, mapDispatchToProps)(Blog);