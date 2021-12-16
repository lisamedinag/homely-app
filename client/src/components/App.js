import React from 'react';
import {Router, Route, Switch, Link} from 'react-router-dom';
import history from '../history';

import HomeCreateForm from "./homes/HomeCreateForm";
import ProtectedRoute from "../auth/ProtectedRoute";
import Profile from "./auth/Profile";

import './layout/App.css'

import {
    Navigation, HomesListByUser, SelectedHome, UsersListByHome, SelectedUser,
    TaskListByHome, SelectedTask, RewardListByHome, SelectedReward
} from './exportedComponents'
import TaskCreateForm from "./tasks/TaskCreateForm";
import RewardCreateForm from "./rewards/RewardCreateForm";
import FormEditHome from "./homes/FormEditHome";
import Dashboard from "./utils/Dashboard";
import FormEditReward from "./rewards/FormEditReward";
import FormEditTask from "./tasks/FormEditTask";

const App = () => {
    return (
                <div className="">

                    <Navigation></Navigation>
                    <Switch>

                        <Route path="/" exact component={Dashboard}/>
                        <ProtectedRoute path="/home/dashboard" exact component={SelectedHome}/>
                        <ProtectedRoute path="/home/dashboard/edit" exact component={FormEditHome}/>
                        <ProtectedRoute path="/home/dashboard/users" exact component={UsersListByHome}/>
                        <ProtectedRoute path="/home/dashboard/users/profile" exact component={SelectedUser}/>
                        <ProtectedRoute path="/home/dashboard/tasks" exact component={TaskListByHome}/>
                        <ProtectedRoute path="/home/dashboard/tasks/new" exact component={TaskCreateForm}/>
                        <ProtectedRoute path="/home/dashboard/tasks/details" exact component={SelectedTask}/>
                        <ProtectedRoute path="/home/dashboard/tasks/edit" exact component={FormEditTask}/>
                        <ProtectedRoute path="/home/dashboard/rewards" exact component={RewardListByHome}/>
                        <ProtectedRoute path="/home/dashboard/rewards/new" exact component={RewardCreateForm}/>
                        <ProtectedRoute path="/home/dashboard/rewards/details" exact component={SelectedReward}/>
                        <ProtectedRoute path="/home/dashboard/rewards/edit" exact component={FormEditReward}/>
                        <ProtectedRoute path="/profile" exact component={Profile}/>
                        <ProtectedRoute path="/home/new" exact component={HomeCreateForm}/>
                    </Switch>
                </div>
    );
};

export default App;
