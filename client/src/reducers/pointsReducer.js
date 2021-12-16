import _ from 'lodash';
import {
    FETCH_POINTS_LIST,
    FETCH_POINTS,
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_POINTS_LIST:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case FETCH_POINTS:
             return { ...state, [action.payload.user]: action.payload };
        default:
            return state;
    }
};
