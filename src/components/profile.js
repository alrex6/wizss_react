import React, { Component } from 'react';
import TopNav from './topNav';
import Post from './post';
import {connect} from 'react-redux';
import {PROFILE} from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Profile extends Component {
    
    userViewed = "";
    userViewedAndUserIsSame = true;
    constructor(props){
        super(props);
        this.follow = this.follow.bind(this);
        

        this.userViewed = this.props.match.params.username;
        if(this.userViewed != this.props.username){
            this.userViewedAndUserIsSame = false;
        }

        this.getProfile = this.getProfile.bind(this);
        console.log("route:", this.props.match.params.username);
    }

    follow(){
        console.log("follow");
        $.ajax({
            method: 'post',
            url:'http://localhost:3000/api/user/follow/',
            data: {
                userToFollow: this.userViewed
                
               
            },
            
            success: (data) => {
               console.log("follow data: ", data);
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

    componentDidMount(){
        this.getProfile();
    }

    getProfile(){
        console.log("get profile");
        $.ajax({
            method: 'get',
            url:'http://localhost:3000/api/user/getProfile/' + this.userViewed,
            // data: {
            //     post: this.replyInputs.post,
                
            //     replyID: this.replyInputs.replyID
            // },
            
            success: (data) => {
               console.log("userprofile: ", data);
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }
    
    render() {
        let followBtn = null;
        if(!this.userViewedAndUserIsSame){
            followBtn = <Button onClick = {this.follow}>Follow</Button>;
        }
        return (
            <div>
                <TopNav></TopNav>
                <div className = 'row mb-5 border bg-dark'>
                    <div className = 'col-lg-12' style = {{height: "100px"}}>{this.userViewed}</div>
                    {followBtn}
                </div>
                
                <Post page = {PROFILE} userViewedAndUserIsSame = {this.userViewedAndUserIsSame} userViewed = {this.userViewed}></Post>
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
        // updatePosts: (posts) => {dispatch({type: UPDATE_POSTS, payload: posts})}
    }
}
// connect(mapStateToProps)(Login);
export default connect(mapStateToProps, mapDispatchToProps)(Profile);

// export default Profile;