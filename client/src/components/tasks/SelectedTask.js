import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {deleteTask} from "../../actions";

import { Loading, AutoAssignOrCompleteTaskButton, ModalConfirmation } from "../exportedComponents"


class SelectedTask extends Component {

    confirmToDeleteTask(task) {
        this.props.deleteTask(task._id)
    }

    render() {
        if (this.props.selectedTask.status === null || this.props.selectedTask.status === undefined) {
            return <div className="ui centered grid "><Loading/></div>
        }

        return (
            <div className="ui centered grid ">
                <div className="center aligned sixteen wide column">
                    <h2>{this.props.selectedTask.name}</h2>
                </div>
                <div className="center aligned sixteen wide column">
                    <p>Description:
                        <br/> {this.props.selectedTask.description}</p>
                </div>
                <div className="center aligned sixteen wide column">
                    <p>Task points: {this.props.selectedTask.points}</p>
                </div>
                {/* <div className="center aligned sixteen wide column">
                    <p>Task status: {this.props.selectedTask.status}</p>
                </div> */}

                {this.props.selectedTask.assignedUser &&
                <div className="center aligned sixteen wide column">
                    <p>Task assigned user: {this.props.selectedTask.assignedUser}</p>
                </div>
                }
                <AutoAssignOrCompleteTaskButton/>

                <div className="row">
                    <div className="center aligned six wide column">
                        <Link to="/home/dashboard/tasks/edit">
                            <button className="drawn-button">Edit</button>
                        </Link>
                    </div>
                    <div className=" center aligned six wide column">
                        <ModalConfirmation queryMessage="Are u sure you want to delete" introButtonMessage="Delete"
                                           delete={this.props.deleteTask} item={this.props.selectedTask}
                                           confirmButtonMessage="Delete"/>
                    </div>

                </div>
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {selectedTask: state.selectedTask};
};
export default connect(mapStateToProps, {deleteTask})(SelectedTask);