import React from 'react';
import {connect} from "react-redux";
import {Field, reduxForm} from 'redux-form';
import {withAuth0} from '@auth0/auth0-react';
import {editReward} from "../../actions";

import { Loading } from "../exportedComponents"


class FormEditReward extends React.Component {
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
        this.props.editReward({
            form: formValues,
            rewardId: this.props.selectedReward._id,
            user: this.props.auth0.user.email

        })
    };

    render() {
        if (this.props.selectedReward === null) {
            return <div><Loading/></div>
        }

        if (this.props.selectedReward.status === 'CLAIMED') {
            return <div>You cant edit a completed task :(</div>
        }

        return (
            <div className="ui centered grid ">

                <div className="box box 1 ">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)}
                          className="center aligned sixteen wide column ui form error evenboxinner">
                        <p>Enter name</p>
                        <Field name="name" component={this.renderInput} label=""
                               placeholder={this.props.selectedReward.name}/>
                        <p>Enter points worth</p>
                        <Field name="pointsWorth" component={this.renderInput} label=" "
                               placeholder={this.props.selectedReward.pointsWorth}/>
                        <p>Enter description</p>
                        <Field name="description" component={this.renderInput} label=""
                               placeholder={this.props.selectedReward.description}/>
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
        selectedReward: state.selectedReward,
    };
};

const authWrapped = withAuth0(FormEditReward)

const formWrapped = reduxForm(
    {form: 'rewardCreateForm', validate}
)(authWrapped);

export default connect(mapStateToProps, {editReward})(formWrapped)


