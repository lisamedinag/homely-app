import {FETCH_HOMES, FETCH_INVITATION_CODE, FETCH_INVITATION_CODE_LIST} from "../actions/types";
import _ from "lodash";

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_INVITATION_CODE_LIST:
            return { ...state, ..._.mapKeys(action.payload, '_id') };
        case FETCH_INVITATION_CODE:
            return {...state, [action.payload.id]: action.payload};

        default:
            return state;
    }
};
