import React, {Component} from "react";
import {Link} from "react-router-dom";
import Loading from "../utils/Loading";
import {connect} from "react-redux";
import {updateStatusAndUserAssignedTask, fetchTasks, selectTask} from "../../actions";
import {withAuth0} from "@auth0/auth0-react";

class AutoAssignOrCompleteTaskButton extends Component {

    updateTask = (taskId, desiredStatus, userId) => {
        this.props.updateStatusAndUserAssignedTask(taskId, desiredStatus, userId)
    }


    render() {
        const userId = this.props.auth0.user.email;
        const selectedTask = this.props.selectedTask;
        if (selectedTask === null || selectedTask === undefined) {
            return <div/>
        }

        if (selectedTask.status === "AVAILABLE") {
            return (
                <div>
                    you can assign the task to yourself
                    <button
                        onClick={() => this.updateTask(selectedTask._id, "ASSIGNED", userId)}>
                        I will do it!
                    </button>
                </div>
            )
        } else if (selectedTask.status === "ASSIGNED" && selectedTask.assignedUser === userId) {
            //TODO FUNCTION TO GET THE POINT FROM A COMPLETED TASK
            return (
                <div>
                    <div>
                        you can set the task as completed and obtain the points
                        <button
                            onClick={() => this.updateTask(selectedTask._id, "COMPLETED", userId)}>
                            Complete the task!
                        </button>
                    </div>
                    <br/>
                    <div>
                        you can set the task as completed and obtain the points
                        <button
                            onClick={() => this.updateTask(selectedTask._id, "AVAILABLE", userId)}>
                            I can't do it
                        </button>
                    </div>
                </div>)
        }
        return <div/>
    }
}

const mapStateToProps = state => {
    return {selectedTask: state.selectedTask};

};
const authWrapped = withAuth0(AutoAssignOrCompleteTaskButton);

export default connect(
    mapStateToProps, {updateStatusAndUserAssignedTask: updateStatusAndUserAssignedTask}
)(authWrapped);