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
    CREATE_REWARD, ASSIGN_TASK, EDIT_REWARD, EDIT_TASK,
} from "./types";



export const fetchHomes = () => async dispatch => {
    const response = await homeService.get('/allHomes');

    dispatch({type: FETCH_HOMES, payload: response.data});
};

export const fetchPopulatedHomes = () => async dispatch => {
    const response = await homeService.get('/populatedHomes');
    dispatch({ type: FETCH_HOMES, payload: response.data });
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

    dispatch({ type: FETCH_POINTS, payload: response.data });
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

    const userId = formValues.user;
    const status = formValues.form.assignedUser !== '' ? 'ASSIGNED' : 'AVAILABLE';
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
    console.log(taskToAssign)

    const response = await tasksService.put('/editTask/' + taskId, taskToAssign);
    dispatch({type: ASSIGN_TASK, payload: response.data});
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
    console.log(rewardToCreate, "from action");

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
    console.log(editedReward, "from action");

    const response = await rewardService.put('/editReward/' + rewardId, editedReward);
    dispatch({type: EDIT_REWARD, payload: response.data});
    history.go(-2);
};

export const updateStatusAndUserAssignedReward = (rewardId, status, userId,) => async (dispatch) => {


    const rewardToAssign = {
        status: status,
        claimedByUser: userId,
    }
    console.log(rewardToAssign)

    const response = await rewardService.put('/editReward/' + rewardId, rewardToAssign);
    dispatch({type: ASSIGN_TASK, payload: response.data});
    history.goBack();
};
