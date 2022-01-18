import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withAuth0} from "@auth0/auth0-react";
import {fetchPopulatedHomes, fetchRewards, fetchTasks} from "../actions";
import {PieChart} from "react-minimal-pie-chart";

// import {useAuth0} from "@auth0/auth0-react";
// TODO change class to function to be able to get user from useAuth0

let completedTasks;
let pendingTasks;
let claimedRewards;
let assignedTasks;
let experience;
let level;
let data = [
    {title: "Completed", value: 30, color: '#a7d27a'},
    {title: "To do", value: 30, color: '#c597c3'}

]

const CLAIMED = "CLAIMED";

const COMPLETED = "COMPLETED";

const AVAILABLE = "AVAILABLE";

const ASSIGNED = "ASSIGNED";

class UserStatistics extends Component {

    componentDidMount() {
        this.props.fetchPopulatedHomes();
        this.props.fetchTasks();
        this.props.fetchRewards();
        // const { user, isAuthenticated, isLoading } = useAuth0();
    }

    claimedRewards() {
        if (this.props.rewards !== null || true) {
            return claimedRewards = this.props.rewards.filter((reward) => {
                return (
                    reward.status === CLAIMED && reward.claimedByUser === this.props.auth0.user.email)
            }).length
        }
    }

    completedTasks() {
        if (this.props.tasks !== null || true) {
            return completedTasks = data[0].value =  this.props.tasks.filter((task) => {
                return (
                    task.status === COMPLETED && task.assignedUser === this.props.auth0.user.email)
            }).length
        }
    }



    availableTasks() {
        if (this.props.tasks !== null || true) {
            return pendingTasks = this.props.tasks.filter((task) => {
                return (
                    task.status === AVAILABLE && task.assignedUser === this.props.auth0.user.email)
            }).length
        }
    }

    assignedTasks(){
        if (this.props.tasks !== null || true) {
            return assignedTasks = data[1].value =this.props.tasks.filter((task) => {
                return (
                    task.status === ASSIGNED && task.assignedUser === this.props.auth0.user.email)
            }).length
        }
    }

    calculateExperienceLevel() {
        experience = completedTasks * 40;
        if (experience > 100) level = 1;
        else if (experience > 250) level = 2;
        else if (experience > 500) level = 3;
        else if (experience > 1000) level = 4;
        else level = 0
    }

    renderChart(data) {

        const shiftSize = 7;


        return (<div>
                <h2>All your tasks</h2>
                <PieChart
                    data={data}
                    animate={ true}
                    label={({ dataEntry }) => Math.round(dataEntry.percentage) + '% ' + dataEntry.title}
                    segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
                    style={{ height: '148px' }}

                />
        </div>

        )
    }


    render() {


        this.availableTasks()
        this.completedTasks()
        this.claimedRewards()
        this.assignedTasks()
        this.calculateExperienceLevel()




        if (this.props.tasks === null || undefined) {
            return <div></div>
        }

        return (
            <div className="">

                <h2>Stats</h2>

                <p>Completed tasks: {completedTasks}</p>
                <p>Claimed rewards: {claimedRewards}</p>
                <p>Assigned tasks: {assignedTasks}</p>
                <p>EXP: {experience}</p>
                <p>LVL: {level}</p>
                <div>{this.renderChart(data)}</div>

            </div>

        );
    }
}

const mapStateToProps = state => {

    return {
        homes: Object.values(state.homes),
        rewards: Object.values(state.rewards),
        tasks: Object.values(state.tasks)
    };
};

const authWrapped = withAuth0(UserStatistics)

export default connect(
    mapStateToProps,
    {fetchPopulatedHomes, fetchTasks, fetchRewards}
)(authWrapped);
