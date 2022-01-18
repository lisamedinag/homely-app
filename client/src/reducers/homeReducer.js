import _ from 'lodash';
import {
    FETCH_HOMES,
    CREATE_HOME,
    EDIT_HOME, DELETE_HOME, FETCH_HOME,
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_HOMES:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case FETCH_HOME:
            return { ...state, [action.payload._id]: action.payload };
        case CREATE_HOME:
            return { ...state, [action.payload._id]: action.payload };
        case EDIT_HOME:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_HOME:
            return _.omit(state, action.payload);
        default:
            return state;
    }
};
