import React from 'react';
import {connect} from "react-redux";
import {Field, reduxForm} from 'redux-form';
import {withAuth0} from '@auth0/auth0-react';
import {createReward} from "../../actions";

import { Loading } from "../exportedComponents"

class RewardCreateForm extends React.Component {
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


    onSubmit = formValues => {

        // const user = this.props.auth0.user.isAuthenticated ? this.props.auth0.user.email : null;
        this.props.createReward({
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
            <div className="ui centered grid ">
                <div className="center aligned sixteen wide column">
                    <h3>Create a Reward for {this.props.selectedHome.name}</h3>
                </div>

                <div className="box box 1 ">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}
                          className="center aligned sixteen wide column ui form error evenboxinner">
                        <p>Enter name</p>
                        <Field name="name" component={this.renderInput} label=""/>
                        <p>Enter points worth</p>
                        <Field name="pointsWorth" component={this.renderInput} label=" "/>
                        <p>Enter description</p>
                        <Field name="description" component={this.renderInput} label=""/>

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

    if (!formValues.pointsWorth) {
        errors.name = 'You must enter the amount of points';
    }

    return errors;
};


const mapStateToProps = state => {
    return {
        selectedHome: state.selectedHome,
    };
};

const authWrapped = withAuth0(RewardCreateForm)

const formWrapped = reduxForm(
    {form: 'rewardCreateForm', validate}
)(authWrapped);

export default connect(mapStateToProps, {createReward})(formWrapped)


