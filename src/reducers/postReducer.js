import {UPDATE_POSTS} from '../actionTypes';

const initialState = {
    posts: [],
    page: "",
    tab: "",
    sortOrder: "",
    sortBy: ""
    
};

export default function(state = initialState, action){
   
    console.log("action:", action);
    switch(action.type){
        
        case UPDATE_POSTS:
            // state.userData.username = action.payload;
            // return state;
            return {
    
                ...state,
                posts: action.payload
    
            
            };
    }
  
    return state;
}