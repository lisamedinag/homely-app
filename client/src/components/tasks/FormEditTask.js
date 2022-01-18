import React from 'react';
import {connect} from "react-redux";
import {Field, reduxForm} from 'redux-form';
import {withAuth0} from '@auth0/auth0-react';
import { editTask} from "../../actions";

import { Loading } from "../exportedComponents"


class FormEditTask extends React.Component {
    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({input, label, meta, placeholder}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" placeholder={placeholder}/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = formValues => {

        this.props.editTask({
            form: formValues,
            taskId: this.props.selectedTask._id
        })
    };

    render() {
        if (this.props.selectedTask === null) {
            return <div><Loading/></div>
        }

        if (this.props.selectedTask.status === 'COMPLETED') {
            return <div><h3>You can't edit a completed task</h3></div>
        }

        return (
            <div className="ui centered grid ">
                <div className="center aligned sixteen wide column">
                    <h3>Edit the Task - {this.props.selectedTask.name}</h3>
                </div>

                <div className="box box 1 ">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}
                          className="center aligned sixteen wide column ui form error evenboxinner">
                        <p>Enter name</p>
                        <Field name="name" component={this.renderInput} label=""
                               placeholder={this.props.selectedTask.name}/>
                        <p>Enter points</p>
                        <Field name="points" component={this.renderInput} label=""
                               placeholder={this.props.selectedTask.points}/>
                        <p>Enter description</p>
                        <Field name="description" component={this.renderInput} label=""
                               placeholder={this.props.selectedTask.description}/>

                        <button className="drawn-button">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.name) {
        errors.name = 'You must enter a name';
    }

    if (!formValues.points) {
        errors.name = 'You must enter the amount of points';
    }


    return errors;
};


const mapStateToProps = state => {
    return {
        selectedTask: state.selectedTask,
    };
};

const authWrapped = withAuth0(FormEditTask)

const formWrapped = reduxForm(
    {form: 'taskEditForm', validate}
)(authWrapped);

export default connect(mapStateToProps, {editTask})(formWrapped)
