import React from 'react';
import {connect} from "react-redux";
import {createTask, editTask} from "../../actions";
import {Field, reduxForm} from 'redux-form';
import {withAuth0} from '@auth0/auth0-react';
import Loading from "../utils/Loading";



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
            return <div>You cant edit a completed task :(</div>
        }

        return (
            <div>
                <h1>Create the Task - {this.props.selectedTask.name}</h1>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">

                    <Field name="name" component={this.renderInput} label="Enter Name" placeholder={this.props.selectedTask.name}/>
                    <Field name="points" component={this.renderInput} label="Enter points" placeholder={this.props.selectedTask.points}/>
                    <Field name="description" component={this.renderInput} label="Enter description" placeholder={this.props.selectedTask.description}/>




                    <button className="ui button primary">Submit</button>
                </form>
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
