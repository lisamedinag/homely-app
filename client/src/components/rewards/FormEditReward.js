import React from 'react';
import {connect} from "react-redux";
import {createReward, editReward} from "../../actions";
import {Field, reduxForm} from 'redux-form';
import {withAuth0} from '@auth0/auth0-react';
import Loading from "../utils/Loading";


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
        console.log()
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
        if (this.props.selectedHome === null) {
            return <div><Loading/></div>
        }

        if (this.props.selectedReward.status === 'CLAIMED') {
            return <div>You cant edit a completed task :(</div>
        }

        return (

            <div>

                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">

                    <Field name="name" component={this.renderInput} label="Enter Name" placeholder={this.props.selectedReward.name}/>
                    <Field name="pointsWorth" component={this.renderInput} label="Enter points worth" placeholder={this.props.selectedReward.pointsWorth}/>
                    <Field name="description" component={this.renderInput} label="Enter rewards description" placeholder={this.props.selectedReward.description}/>


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
        selectedReward: state.selectedReward,
    };
};

const authWrapped = withAuth0(FormEditReward)

const formWrapped = reduxForm(
    {form: 'rewardCreateForm', validate}
)(authWrapped);

export default connect(mapStateToProps, {editReward})(formWrapped)


