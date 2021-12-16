import React from 'react';
import {connect} from "react-redux";
import {createReward} from "../../actions";
import {Field, reduxForm} from 'redux-form';
import {withAuth0} from '@auth0/auth0-react';
import Loading from "../utils/Loading";


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
        console.log(formValues)
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
            <div>
                <h1>Create a Reward for {this.props.selectedHome.name}</h1>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">

                    <Field name="name" component={this.renderInput} label="Enter Name"/>
                    <Field name="pointsWorth" component={this.renderInput} label="Enter points worth"/>
                    <Field name="description" component={this.renderInput} label="Enter rewards description"/>


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


