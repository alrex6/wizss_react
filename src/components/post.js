import React, { Component } from 'react';
import {connect} from 'react-redux';
import {UPDATE_POSTS, MOST_RECENT, LAST_REPLIED, TAGS, USER, PROFILE, HOME, POST_LIMIT} from '../actionTypes';
import { Button, Form, FormGroup, Label, Input, FormText,Nav, NavItem, NavLink } from 'reactstrap';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Blog from './blog';

class Post extends Component {
    POST_LIMIT = 2;
    GET_POST_TYPES = {
        changeTab: 1,
        changeStartPoint: 2,
        initialize: 3,
        addStartPoint: 4
    }
    postInputs = {
        post: ""
    }

    replyInputs = {
        post: "",
        replyID: 0
    }

    // posts = [];
    
    constructor(props){
        super(props);
        console.log("user and viewed is same: ", this.props.userViewedAndUserIsSame);
        this.state = {
            posts: [],
            repliesShown: false,
            replyID: 0,
            tab: TAGS,
            startPoint: 0,
            sortBy: MOST_RECENT
            
        }
        this.submitPost = this.submitPost.bind(this);
        this.showReplies = this.showReplies.bind(this);
        this.replyPost = this.replyPost.bind(this);
        this.onChangeTab = this.onChangeTab.bind(this);
        this.addStartPoint = this.addStartPoint.bind(this);
    }

    componentDidMount(){
        console.log('component mount');
        // this.props.updatePosts([]);
        this.getPosts();
        // $.ajax({
        //     method: 'get',
        //     url:'http://localhost:3000/api/blog/getAllBlogs',
            
            
        //     success: (data) => {
        //        console.log("get all blogs:", data);
        //        this.setState({posts: data.data});
        //     //    this.props.updatePosts(data.data);
               
        //     },
        //     error: function(err){
        //        console.log(err);
        //     }
        // });
    }

    submitPost(){
        console.log(this.props.username);
        $.ajax({
            method: 'post',
            url:'http://localhost:3000/api/blog/createBlog',
            data: {
                post: this.postInputs.post,
                creator: this.props.username
            },
            
            success: (data) => {
               console.log(data);
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

    showReplies(post){
        console.log('show replies', post);
        // this.state.repliesShown = true;
        console.log("posts: ", this.state.posts);
        this.setState({repliesShown: true});
        this.replyInputs.replyID = post.id;

        $.ajax({
            method: 'post',
            url:'http://localhost:3000/api/blog/showReplies',
            data: {
                
                
                replyID: post.id,
                sortBy: this.state.sortBy
            },
            
            success: (data) => {
                console.log("replies: ", data);
                let postsClone = this.state.posts;
                let index = postsClone.indexOf(post);
                let lastValue = null;
                data.data.forEach((value) => {
                    // postsClone.splice(index + 1, 0, value);
                    this.addAddtlData(value);
                    this.state.posts.splice(index + 1, 0, value);    
                    lastValue = value;
                });
                 
                index = this.state.posts.indexOf(lastValue);
                this.state.posts.forEach((value, ndx) => {
                    if(ndx > index){
                        value.render = false;
                    }
                })
                this.setState({posts: [...this.state.posts]});

                console.log("postsclone: ", postsClone);
                // this.setState({posts: postsClone});
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });  
    }

    addAddtlData(post){
        post.render = true;
    }

    getPosts(getPostType = this.GET_POST_TYPES.initialize){
        let url = 'http://localhost:3000/api/blog/getHomeBlogs';
        if(this.props.page == PROFILE){
            url = 'http://localhost:3000/api/blog/getProfileBlogs';
        }
        
        $.ajax({
            method: 'post',
            url: url,
            data: {
                tab: this.state.tab,
                sortBy: this.state.sortBy,
                startPoint: this.state.startPoint,
                userViewed: this.props.userViewed
            },
            
            success: (data) => {
                console.log("getposts data:", data);
                data.payload.forEach((value) => {
                    this.addAddtlData(value);
                });

                if(getPostType == this.GET_POST_TYPES.addStartPoint){
                    this.addPosts(data.payload);
                }else{
                    console.log("get posts payload:", data.payload);
                    this.setState({posts: data.payload});
                    console.log("posts: ", this.state.posts);
                }
                
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });   
    }

    addPosts(addtlPosts){
        
        addtlPosts.forEach((value) => {
            this.state.posts.push(value);
        });
        
        this.setState({posts: this.state.posts});
    }

    replyPost(){
        console.log('reply post');
        $.ajax({
            method: 'post',
            url:'http://localhost:3000/api/blog/replyBlog',
            data: {
                post: this.replyInputs.post,
                
                replyID: this.replyInputs.replyID
            },
            
            success: (data) => {
               console.log(data);
            //    this.props.updatePosts(data.data);
               
            },
            error: function(err){
               console.log(err);
            }
        });
    }

   

    onChangeTab(tabName){
        console.log("tab: ", tabName);
        this.state.tab = tabName;
        this.state.startPoint = 0;
        this.setState({posts: []});
        // this.state.posts = [];
        // this.setState({tab: tabName, posts: []});
        this.getPosts();
        // this.state.tab = tabName;
    }

    addStartPoint(){
        console.log("add start pt");
        console.log(this.state.startPoint);
        this.state.startPoint = this.state.startPoint + this.POST_LIMIT;
        
        
        if(this.replyInputs.replyID == 0){
            this.getPosts(this.GET_POST_TYPES.addStartPoint);
        }
    }

    render() {
        
        let replyDiv = null;
        if(this.state.repliesShown && this.props.userViewedAndUserIsSame){
            replyDiv = <div>
                <FormGroup>
                    <Label for="exampleText">Text Area</Label>
                    <Input onChange = {(e) => {this.replyInputs.post = e.target.value}} type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <Button onClick = {this.replyPost}>Post</Button>
            </div>;
        }

        return (
            <div>
                <div className = 'createPostArea mb-5 px-3 bg-primary'>
                    <FormGroup>
                        <Label for="exampleText">Text Area</Label>
                        <Input onChange = {(e) => {this.postInputs.post = e.target.value}} type="textarea" name="text" id="exampleText" />
                    </FormGroup>
                    <Button onClick = {this.submitPost}>Post</Button>
                </div>
                <Nav>
                    <NavItem>
                        <NavLink onClick = {() => this.onChangeTab(TAGS)} href="#">Tags</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick = {() => this.onChangeTab(USER)} href="#">User</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Another Link</NavLink>
                    </NavItem>
                    
                </Nav>
                <div>
                    {this.state.posts.map((post, index) => <Blog showReplies = {this.showReplies} post = {post} key = {index}></Blog> )}
                </div>
                <div className = 'navDiv mb-5'>
                    <Input onChange = {(e) => {this.setState({startPoint: e.target.value})}} type="text" name="text" id="exampleText" value = {this.state.startPoint} />  
                    <Button onClick = {this.addStartPoint}>Next</Button>
                </div>
                {/* {this.state.postsArray.map((post, index) => <Post DeleteBlog = {this.DeleteBlog} navObj = {this.navObj} ShowReplies = {this.ShowReplies} postsProps = {post} key = {post.key}></Post> )}                     */}
                {replyDiv}                 
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
        updatePosts: (posts) => {dispatch({type: UPDATE_POSTS, payload: posts})}
    }
}
// connect(mapStateToProps)(Login);
export default connect(mapStateToProps, mapDispatchToProps)(Post);

