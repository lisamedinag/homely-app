import userService from "../services/userService";
import homeService from "../services/homeService";
import tasksService from "../services/taskService";
import rewardService from "../services/rewardService";
import pointService from "../services/pointService";
import history from "../history";

import {
    FETCH_HOMES,
    FETCH_USERS,
    FETCH_TASKS,
    FETCH_REWARDS,
    CREATE_HOME,
    FETCH_POINTS,
    FETCH_POINTS_LIST,
    SELECTED_HOME,
    SELECTED_USER,
    SELECTED_TASK,
    CREATE_TASK,
    SELECTED_REWARD,
    CREATE_REWARD,
    ASSIGN_TASK,
    EDIT_REWARD,
    EDIT_TASK,
    DELETE_HOME,
    DELETE_REWARD,
    DELETE_TASK,
    FETCH_INVITATION_CODE,
    VALIDATE_INVITATION_CODE, FETCH_HOME, FETCH_INVITATION_CODE_LIST,
} from "./types";
import invitationService from "../services/invitationService";


export const fetchHomes = () => async dispatch => {
    const response = await homeService.get('/allHomes');

    dispatch({type: FETCH_HOMES, payload: response.data});
};

export const fetchPopulatedHomes = () => async dispatch => {
    const response = await homeService.get('/populatedHomes');
    dispatch({type: FETCH_HOMES, payload: response.data});
};

export const createHome = formValues => async (dispatch) => {
    const userId = formValues.user;
    const homeToCreate = {
        name: formValues.form.name,
        owner: userId,
        usersArr: [userId]
    }
    const response = await homeService.post('/newHome', homeToCreate);
    dispatch({type: CREATE_HOME, payload: response.data});
    history.goBack();
};


export const editHome = (newName, homeId) => async (dispatch) => {

    const homeToCreate = {
        name: newName
    }
    const response = await homeService.put('/edithome/' + homeId, homeToCreate);
    dispatch({type: CREATE_HOME, payload: response.data});
    history.goBack();
};

export const deleteHome = homeId => async (dispatch) => {


    await homeService.delete('/deletehome/' + homeId);
    dispatch({type: DELETE_HOME, payload: homeId});
    history.goBack();
};

export const fetchUsers = () => async dispatch => {
    const response = await userService.get('/allUsers');

    dispatch({ type: FETCH_USERS, payload: response.data });
};

export const fetchTasks = () => async dispatch => {
    const response = await tasksService.get('/allTasks');

    dispatch({ type: FETCH_TASKS, payload: response.data });
};

export const fetchRewards = () => async dispatch => {
    const response = await rewardService.get('/allRewards');

    dispatch({ type: FETCH_REWARDS, payload: response.data });
};

export const fetchPointsList = () => async dispatch => {
    const response = await pointService.get('/allPoints');

    dispatch({ type: FETCH_POINTS_LIST, payload: response.data });
};

export const fetchPointsByUserAndHome = (userId, homeId) => async dispatch => {
    const response = await pointService.get(`/user/${userId}/home/${homeId}`);
    dispatch({type: FETCH_POINTS, payload: response.data});
}

export const addPoints = (userId, homeId, taskPoints) => async dispatch => {
    const data = {
        user: userId,
        home: homeId,
        points: parseInt(taskPoints)
    }


    const response = await pointService.post("/addPoints", data);
    dispatch({type: FETCH_POINTS, payload: response.data});

}

export const buyReward = (userId, homeId, rewardPointsWorth) => async dispatch => {

    const data = {
        user: userId,
        home: homeId,
        pointsWorth: parseInt(rewardPointsWorth)
    }

    const response = await pointService.post("/substractPoints", data);
    dispatch({type: FETCH_POINTS, payload: response.data});

}

export const selectHome = (home) => {
    return {
        type: SELECTED_HOME,
        payload: home
    };
};

export const selectUser = (user) => {
    return {
        type: SELECTED_USER,
        payload: user
    };
};

export const selectTask = (task) => {
    return {
        type: SELECTED_TASK,
        payload: task
    };
};

export const createTask = formValues => async (dispatch) => {


    const status = formValues.form.assignedUser === 'AVAILABLE' ? 'AVAILABLE' : 'ASSIGNED';
    const taskToCreate = {
        name: formValues.form.name,
        points: parseInt(formValues.form.points),
        description: formValues.form.description,
        status: status,
        assignedUser: formValues.form.assignedUser,
        home: formValues.home
    }

    const response = await tasksService.post('/newTask', taskToCreate);
    dispatch({type: CREATE_TASK, payload: response.data});
    history.goBack();
};



export const editTask = formValues => async (dispatch) => {

    const taskId = formValues.taskId;
    const editedTask = {
        name: formValues.form.name,
        points: parseInt(formValues.form.points),
        description: formValues.form.description,
    }

    const response = await tasksService.put('/editTask/' + taskId, editedTask);
    dispatch({type: EDIT_TASK, payload: response.data});
    history.go(-2);
};
export const updateStatusAndUserAssignedTask = (taskId, status, userId,) => async (dispatch) => {


    const taskToAssign = {
        status: status,
        assignedUser: userId,
    }

    const response = await tasksService.put('/editTask/' + taskId, taskToAssign);
    dispatch({type: ASSIGN_TASK, payload: response.data});
    history.goBack();
};

export const deleteTask = taskId => async (dispatch) => {
    await tasksService.delete('/deletetask/' + taskId);
    dispatch({type: DELETE_TASK, payload: taskId});
    history.goBack();
};



export const selectReward = (task) => {
    return {
        type: SELECTED_REWARD,
        payload: task
    };
};


export const createReward = formValues => async (dispatch) => {
    const userId = formValues.user;
    const rewardToCreate = {
        name: formValues.form.name,
        pointsWorth: parseInt(formValues.form.pointsWorth),
        description: formValues.form.description,
        status: 'AVAILABLE',
        claimedByUser: '',
        home: formValues.home
    }


    const response = await rewardService.post('/newReward', rewardToCreate);
    dispatch({type: CREATE_REWARD, payload: response.data});
    history.goBack();
};

export const editReward = formValues => async (dispatch) => {
    const rewardId = formValues.rewardId;
    const editedReward = {
        name: formValues.form.name,
        pointsWorth: parseInt(formValues.form.pointsWorth),
        description: formValues.form.description,
    }


    const response = await rewardService.put('/editReward/' + rewardId, editedReward);
    dispatch({type: EDIT_REWARD, payload: response.data});
    history.go(-2);
};

export const updateStatusAndUserAssignedReward = (rewardId, status, userId,) => async (dispatch) => {


    const rewardToAssign = {
        status: status,
        claimedByUser: userId,
    }


    const response = await rewardService.put('/editReward/' + rewardId, rewardToAssign);
    dispatch({type: ASSIGN_TASK, payload: response.data});
    history.goBack();
};

export const deleteReward = rewardId => async (dispatch) => {
    await rewardService.delete('/deletereward/' + rewardId);
    dispatch({type: DELETE_REWARD, payload: rewardId});
    history.goBack();
};

export const fetchAllTokens = () => async dispatch => {
    const response = await invitationService.get('/allTokens');

    dispatch({type: FETCH_INVITATION_CODE_LIST, payload: response.data});
};

export const fetchInvitationCode = (homeId) => async dispatch => {
    const data = {
        home: homeId
    }
    const response = await invitationService.post('/newToken', data);
 
    dispatch({type: FETCH_INVITATION_CODE, payload: response.data});
};

export const validateInvitationCode = (token_key, user) => async dispatch => {
    const data = {
        token_key: token_key,
        user: user
    }
    const response = await invitationService.post('/joinByToken', data);

    dispatch({type: FETCH_HOME, payload: response.data.home});
    history.goBack();
};