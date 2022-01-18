import React, {Component} from "react";
import {connect} from "react-redux";
import {withAuth0} from "@auth0/auth0-react";
import {updateStatusAndUserAssignedTask, addPoints } from "../../actions";

import { Loading } from "../exportedComponents"

class AutoAssignOrCompleteTaskButton extends Component {

    updateTask = (task, desiredStatus, userId) => {
 
        userId = desiredStatus === "AVAILABLE" ? "AVAILABLE" : userId
        this.props.updateStatusAndUserAssignedTask(task._id, desiredStatus, userId);
        if (desiredStatus === "COMPLETED") {
            this.props.addPoints(
                userId, this.props.selectedHome._id, task.points
            )
        }

    }


    render() {
        const userId = this.props.auth0.user.email;
        const selectedTask = this.props.selectedTask;

        if (selectedTask === null || selectedTask === undefined) {
            return <div><Loading/></div>
        }

        if (selectedTask.status === "AVAILABLE") {
            return (
                <div  className="center aligned sixteen wide column">
                    <button className="drawn-button"
                        onClick={() => this.updateTask(selectedTask, "ASSIGNED", userId)}>
                        I will do it!
                    </button>
                </div>
            )
        } else if (selectedTask.status === "ASSIGNED" && selectedTask.assignedUser === userId) {
            //TODO FUNCTION TO GET THE POINT FROM A COMPLETED TASK
            return (
                <div>
                    <div className="center aligned sixteen wide column">
                        <button
                            className="drawn-button"
                            onClick={() => this.updateTask(selectedTask, "COMPLETED", userId)}>
                            Complete the task!
                        </button>
                    </div>
                    <br/>
                    <div className="center aligned sixteen wide column">
                        <button
                            className="drawn-button"
                            onClick={() => this.updateTask(selectedTask, "AVAILABLE", userId)}>
                            Resign task
                        </button>
                    </div>
                </div>)
        }
        return <div/>
    }
}

const mapStateToProps = state => {
    return {
        selectedTask: state.selectedTask,
        selectedHome: state.selectedHome
    };

};
const authWrapped = withAuth0(AutoAssignOrCompleteTaskButton);

export default connect(
    mapStateToProps, {updateStatusAndUserAssignedTask: updateStatusAndUserAssignedTask, addPoints}
)(authWrapped);