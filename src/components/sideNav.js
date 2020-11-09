import React, { Component } from 'react';
import {connect} from 'react-redux';
import {SET_USERNAME, apiPath} from '../actionTypes';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class SideNav extends Component {

    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };

        this.logout = this.logout.bind(this);
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    logout(){
        this.props.setUsername("");
        localStorage.removeItem('userData');  
        $.ajax({
            method: 'get',
            url: apiPath + 'user/logout',
            
            
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
        if(this.props.userData.username == ""){
            console.log("redurect");
            console.log("username", this.props.userData.username);
            return <Redirect to='/login' />
        }
        return (
            <div>
                <Nav vertical>
                    <NavItem>
                        <NavLink tag = {Link} to = {'/home'}>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag = {Link} to = {'/level'}>Level 1</NavLink>
                    </NavItem>
                    {/* <NavItem>
                        <NavLink tag = {Link} to = {`/profile/${this.props.userData.username}`}>Level 2</NavLink>
                    </NavItem> */}
                    <NavItem>
                        <NavLink tag = {Link} to = {'/questionlevel'}>Question Level</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag = {Link} to = {'/question'}>Questions</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag = {Link} to = {'/ad'}>Ad</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick = {this.logout}>Logout</NavLink>
                    </NavItem>
                    
                </Nav>  
            </div>
            
        
        );
    }
}

function mapStateToProps(state){
    console.log("state map", state);
    return {
        posts: state.post.posts,
        userData: state.user
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
export default connect(mapStateToProps, mapDispatchToProps)(SideNav);