import {
    SELECTED_HOME,
    SELECTED_REWARD,
    SELECTED_TASK,
    SELECTED_USER
} from "../actions/types";

export const selectedHomeReducers = (selectedHome = null, action) => {
    if (action.type === SELECTED_HOME) {
        return action.payload;
    }
    return selectedHome;
};

export const selectedUserReducers = (selectedUser = null, action) => {
    if (action.type === SELECTED_USER) {
        return action.payload;
    }
    return selectedUser;
};

export const selectedTaskReducers = (selectedTask = null, action) => {
    if (action.type === SELECTED_TASK) {
        return action.payload;
    }
    return selectedTask;
};

export const selectedRewardReducers = (selectedReward = null, action) => {
    if (action.type === SELECTED_REWARD) {
        return action.payload;
    }
    return selectedReward;
};

