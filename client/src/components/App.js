import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './layout/App.css'

import history from '../history';
import ProtectedRoute from "../auth/ProtectedRoute";
import {
    Navigation, Profile, Dashboard, HomeCreateForm, FormEditHome, JoinHome, HomeInviteGenerator, SelectedHome,
    UsersListByHome, SelectedUser, TaskCreateForm, FormEditTask, TaskListByHome, SelectedTask, RewardCreateForm,
    FormEditReward, RewardListByHome, SelectedReward } from './exportedComponents'

const App = () => {
    return (
        <div className="">

            <Navigation></Navigation>

            <div className="main-section">
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
                    <ProtectedRoute path="/home/join" exact component={JoinHome}/>
                    <ProtectedRoute path="/home/dashboard/invite" exact component={HomeInviteGenerator}/>
                </Switch>
            </div>

        </div>
    );
};

export default App;
