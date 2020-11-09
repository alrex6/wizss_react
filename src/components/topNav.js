import React, { Component } from 'react';
import {connect} from 'react-redux';
import {SET_USERNAME} from '../actionTypes';
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
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class TopNav extends Component {

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
    }

    render() {
        return (
            <div>
                <Navbar className = "mb-" color="light" light expand="md">
                    <NavbarBrand href="/">wizss</NavbarBrand>
                    {/* <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        
                        <NavItem>
                            
                            <NavLink tag = {Link} to = {`/profile/${this.props.userData.username}`} >Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            
                            <NavLink tag = {Link} to = "/home">Home</NavLink>
                        </NavItem>
                       
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                            Options
                            </DropdownToggle>
                            <DropdownMenu right>
                            <DropdownItem>
                                Option 1
                            </DropdownItem>
                            <DropdownItem>
                                Option 2
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick = {this.logout}>
                                Logout
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        </Nav>
                    </Collapse> */}
                </Navbar>    
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
export default connect(mapStateToProps, mapDispatchToProps)(TopNav);

// export default TopNav;