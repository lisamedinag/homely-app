import _ from 'lodash';
import {
    ASSIGN_TASK,
    CREATE_TASK,
    DELETE_TASK,
    EDIT_TASK,
    FETCH_TASKS,

} from '../actions/types';

export default (state = {}, action) => {

    switch (action.type) {
        case FETCH_TASKS:
            return {...state, ..._.mapKeys(action.payload, '_id')};
        case CREATE_TASK:
            return {...state, [action.payload._id]: action.payload};
        case ASSIGN_TASK:
            return {...state, [action.payload._id]: action.payload};
        case EDIT_TASK:
            return {...state, [action.payload._id]: action.payload};
        case DELETE_TASK:
            return _.omit(state, action.payload);


        default:
            return state;
    }
};
