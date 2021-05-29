import { UID } from "../actions/uid";

const intialState = {
  uid: ""
};

const uidReducer = (state = intialState, action) => {
  switch (action.type) {
    case UID:
        return { ...state, uid: action.id };
        
    default:
      return state;
  }
};

export default uidReducer;
