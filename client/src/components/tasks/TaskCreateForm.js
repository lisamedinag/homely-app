import React from 'react';
import {connect} from "react-redux";
import {createTask} from "../../actions";
import {Field, reduxForm} from 'redux-form';
import {withAuth0} from '@auth0/auth0-react';
import Loading from "../utils/Loading";



class TaskCreateForm extends React.Component {
    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    };

    renderSelect = ({input, label, meta}) => {
        console.log(this.props.selectedHome.usersArr)
        return (
            <div>
                <label>{label}</label>
                <select {...input}>
                    <option value=""></option>
                    {this.props.selectedHome.usersArr.map((user, index) => {
                        return <option value={user} key={user}>{user}</option>;
                    })}
                </select>
                {this.renderError(meta)}
            </div>

        )
    }


    onSubmit = formValues => {

        this.props.createTask({
            form: formValues,
            home: this.props.selectedHome._id,
            user: this.props.auth0.user.email

        })
    };

    render() {
        if (this.props.selectedHome === null) {
            return <div><Loading/></div>
        }

        return (
            <div>
                <h1>Create a Task for {this.props.selectedHome.name}</h1>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">

                    <Field name="name" component={this.renderInput} label="Enter Name"/>
                    <Field name="points" component={this.renderInput} label="Enter points"/>
                    <Field name="description" component={this.renderInput} label="Enter description"/>
                    <Field name="assignedUser" component={this.renderSelect} label="Assign an user">

                    </Field>


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
        selectedHome: state.selectedHome,
    };
};

const authWrapped = withAuth0(TaskCreateForm)

const formWrapped = reduxForm(
    {form: 'taskCreateForm', validate}
)(authWrapped);

export default connect(mapStateToProps, {createTask})(formWrapped)
