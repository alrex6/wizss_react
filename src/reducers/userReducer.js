import {SET_USERNAME} from '../actionTypes';

const initialState = {
    username: ""
    
};

export default function(state = initialState, action){
   
    
    switch(action.type){
      case 'INCREASE_COUNTER':
        return {counter: state.counter + 1}
      case 'DECREASE_COUNTER':
        return {counter: state.counter - 1}
      case SET_USERNAME:
        // state.userData.username = action.payload;
        // return state;
        return {
  
          ...state,
          username: action.payload
  
          
        };
    }
  
    return state;
}