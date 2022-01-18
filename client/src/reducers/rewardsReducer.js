import _ from 'lodash';
import {
    ASSIGN_REWARD,
    CREATE_REWARD,
    DELETE_REWARD,
    DELETE_TASK,
    EDIT_REWARD,
    FETCH_REWARDS,
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_REWARDS:
            return {...state, ..._.mapKeys(action.payload, '_id')};
        case CREATE_REWARD:
            return {...state, [action.payload._id]: action.payload};
        case ASSIGN_REWARD:
            return {...state, [action.payload._id]: action.payload};
        case EDIT_REWARD:
            return {...state, [action.payload._id]: action.payload};
        case DELETE_REWARD:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};
