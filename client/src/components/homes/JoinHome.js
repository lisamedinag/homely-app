import React from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { withAuth0 } from '@auth0/auth0-react';
import { validateInvitationCode } from "../../actions";


class JoinHome extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = formValues => {

        // const user = this.props.auth0.user.isAuthenticated ? this.props.auth0.user.email : null;
        this.props.validateInvitationCode(
            formValues.token,
            this.props.auth0.user.email

        )
    };

    render() {
 
        return (
            <div className="">
                <div className="ui centered grid ">
                    <div className="center aligned sixteen wide column">
                        <h2>Join a new home!</h2>
                    </div>
                    <div className="box box 1 ">
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="center aligned sixteen wide column ui form error evenboxinner">
                            <p>Insert Your invitation code</p>
                            <Field className="center aligned sixteen wide column " name="token" component={this.renderInput} label="" />

                            <button className="drawn-button">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = 'You must enter a code';
    }
    return errors;
};


const authWrapped = withAuth0(JoinHome)

const formWrapped = reduxForm(
    { form: 'joinHomeForm', validate }
)(authWrapped);

export default connect(null, { validateInvitationCode })(formWrapped)
