import React from 'react';
import {connect} from "react-redux";
import {Field, reduxForm} from 'redux-form';
import {withAuth0} from '@auth0/auth0-react';

import { editHome } from "../../actions";
import {Loading} from "../exportedComponents";

class FormEditHome extends React.Component {
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
                <input {...input} autoComplete="off" placeholder={this.props.selectedHome.name}/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = formValues => {

        // const user = this.props.auth0.user.isAuthenticated ? this.props.auth0.user.email : null;
        this.props.editHome(formValues.name, this.props.selectedHome._id)
    };

    render() {
        if (this.props.auth0.isAuthenticated !== true) {
            return <div className="ui centered grid "><Loading/></div>
        }

        return (
            <div className="">
                <div className="ui centered grid ">
                    <div className="center aligned sixteen wide column">
                        <h1>Edit {this.props.selectedHome.name}</h1>
                    </div>

                    <div className="box box 1 ">
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)}
                              className="center aligned sixteen wide column ui form error evenboxinner">
                            <p>Enter name</p>
                            <Field className="center aligned sixteen wide column " name="name"
                                   component={this.renderInput}
                                   label=""/>
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
        errors.name = 'You must enter a name';
    }


    return errors;
};

const mapStateToProps = state => {
    return {
        selectedHome: state.selectedHome,
    };
};

const authWrapped = withAuth0(FormEditHome)

const formWrapped = reduxForm(
    {form: 'homeEditForm', validate}
)(authWrapped);

export default connect(mapStateToProps, {editHome})(formWrapped)
