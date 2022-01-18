import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {withAuth0} from "@auth0/auth0-react";
import {PieChart} from "react-minimal-pie-chart";
import {fetchTasks, selectTask} from "../../actions";

import { Loading } from "../exportedComponents"

let data = [
    {title: "Completed", value: 33, color: '#a7d27a'},
    {title: "Assigned", value: 33, color: '#c597c3'},
    {title: "To do", value: 33, color: '#799bd0'}

]

let completedTasks;
let pendingTasks;

let assignedTasks;


const COMPLETED = "COMPLETED";

const AVAILABLE = "AVAILABLE";

const ASSIGNED = "ASSIGNED";

class TaskListByHome extends Component {
    componentDidMount() {

        this.props.fetchTasks()
    }

    completedTasks() {
        if (this.props.tasks !== null || true) {
            return completedTasks = data[0].value = this.props.tasks.filter(task => task.status === COMPLETED).length
        }
    }


    availableTasks() {
        if (this.props.tasks !== null || true) {
            return pendingTasks = data[1].value = this.props.tasks.filter(task => task.status === AVAILABLE).length
        }
    }

    assignedTasks() {
        if (this.props.tasks !== null || true) {
            return assignedTasks = data[2].value = this.props.tasks.filter(task => task.status === ASSIGNED).length
        }
    }


    renderList(status) {
        return this.props.tasks.map((task, index) => {

            if (task.home === this.props.selectedHome._id && task._id && task.status === status) {
                let taskIcon = task.assignedUser === this.props.auth0.user.email ? "thumbtack" : "paperclip"
                let taskColor = task.assignedUser === this.props.auth0.user.email ? "#F7CE019E" : "#FCDF8599"
                return (
                    <div key={index} className="sixteen wide column evenboxinner highlight"
                         style={{backgroundColor: taskColor}}>
                        <div key={index} className="sixteen wide column">

                            <Link to="/home/dashboard/tasks/details">
                                <div className="item" onClick={() => this.props.selectTask(task)}><i
                                    className={`large middle aligned icon ${taskIcon}`}/><p
                                    className="curly">{task.name}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )

            }

        })
    }

    renderChart(data) {

        const shiftSize = 7;


        return (<div>
            <h2>All your tasks</h2>
            <PieChart
                data={data}
                animate={true}
                label={({dataEntry}) => Math.round(dataEntry.percentage) + '% '} //+ dataEntry.title
                segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
                style={{height: '170px', width: '170px'}}/>
            /</div>)
    }


    render() {
        this.availableTasks()
        this.completedTasks()
        this.assignedTasks()

        if (this.props.selectedHome && this.props.tasks) {
            return (
                <div className="ui centered grid">
                    <div className="center aligned sixteen wide column">
                        <h2>Task List of {this.props.selectedHome.name}</h2>
                    </div>
                    {/*<div className="celled list">{this.renderList("AVAILABLE")}</div>*/}

                    {this.props.tasks &&
                    <>
                        <div className="ui celled list center aligned sixteen wide column  box box 1">
                            <h4>Available</h4>{this.renderList("AVAILABLE")}</div>

                        <div className="ui celled list center aligned sixteen wide column  box box 1">
                            <h4>Assigned</h4>{this.renderList("ASSIGNED")}</div>

                        {/*<div className="ui celled list center aligned sixteen wide column  box box 1">*/}
                        {/*    <h4>Completed</h4>{this.renderList("COMPLETED")}</div>*/}
                    </>
                    }


                    <div className="center aligned sixteen wide column">
                        <Link to="/home/dashboard/tasks/new">
                            <button className="button drawn-button">Create new Task</button>
                        </Link>
                    </div>

                    <div>{this.renderChart(data)}</div>
                </div>
            )
        } else {
            return <div className="ui centered grid"><Loading/></div>
        }
    }
}

const mapStateToProps = state => {
    return {
        tasks: Object.values(state.tasks),
        selectedHome: state.selectedHome
    };
};

const authWrapped = withAuth0(TaskListByHome)

export default connect(
    mapStateToProps, {fetchTasks, selectTask}
)(authWrapped);

