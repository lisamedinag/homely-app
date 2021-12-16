import React, { Component } from 'react';

import { connect } from "react-redux";
import Loading from "../utils/Loading";

import { fetchTasks, selectTask } from "../../actions";
import { Link } from "react-router-dom";


class TaskListByHome extends Component {
    componentDidMount() {

        this.props.fetchTasks()
    }



    renderList(status) {
        return this.props.tasks.map((task, index) => {

            if (task.home === this.props.selectedHome._id && task._id && task.status === status){
                return (
                    <div key={index}  className="sixteen wide column" >

                        <Link to="/home/dashboard/tasks/details">
                            <div  onClick={() => this.props.selectTask(task)}>{task.name}</div>
                        </Link>
                    </div>
                )

            }

        })
    }

    render() {
        if (this.props.selectedHome && this.props.tasks) {
            return (
                <div className="ui centered grid">
                    <div className="center aligned sixteen wide column">
                        <h2>Task List of {this.props.selectedHome.name}</h2>
                    </div>

                    <div className="celled list">{this.renderList("AVAILABLE")}</div>

                    <div className="center aligned sixteen wide column">
                        <Link to="/home/dashboard/tasks/new">
                            <button className="button">Create new Task</button>
                        </Link>
                    </div>

                    <h2>Task List of {this.props.selectedHome.name}</h2>
                    <br/>
                    <h2>Available</h2>
                    <div className="ui celled list">{this.renderList("AVAILABLE")}</div>
                    <h2>Assigned</h2>
                    <div className="ui celled list">{this.renderList("ASSIGNED")}</div>
                    <h2>Completed</h2>
                    <div className="ui celled list">{this.renderList("COMPLETED")}</div>
                    <Link to="/home/dashboard/tasks/new">
                        <button className="button">Create new Task</button>
                    </Link>
                </div>
            )
        } else {
            return <div className="ui centered grid"><Loading /></div>
        }
    }
}

const mapStateToProps = state => {
    return {
        tasks: Object.values(state.tasks),
        selectedHome: state.selectedHome
    };
};

export default connect(
    mapStateToProps, { fetchTasks, selectTask }
)(TaskListByHome);

