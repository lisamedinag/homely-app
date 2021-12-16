import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import homeReducer from "./homeReducer";
import userReducer from "./userReducer";
import tasksReducer from "./tasksReducer";
import pointsReducer from "./pointsReducer";
import rewardsReducer from "./rewardsReducer";

import {selectedHomeReducers, selectedUserReducers, selectedTaskReducers, selectedRewardReducers} from "./selectedReducer";





export default combineReducers({
 homes: homeReducer,
 selectedHome: selectedHomeReducers,

 users: userReducer,
 selectedUser: selectedUserReducers,

 tasks: tasksReducer,
 selectedTask: selectedTaskReducers,

 rewards: rewardsReducer,
 selectedReward: selectedRewardReducers,

 points: pointsReducer,
 form: formReducer
});
