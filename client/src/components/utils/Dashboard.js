import React, {Component} from 'react';
import {withAuth0} from "@auth0/auth0-react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {editHome, fetchPopulatedHomes, selectHome} from "../../actions";
import HomesListByUser from "../homes/HomesListByUser";
import Loading from "./Loading";

class Dashboard extends Component {


    renderPublicDashboard() {
        return (
            <div>This is the public dashboard on page. Login to see thee whole app/</div>
        );
    }

    renderAuthenticatedDashboard() {
        return (
            <div><HomesListByUser/></div>
        );
    }

    render() {
        if (this.props.auth0.isAuthenticated !== true) {
            return <div >{this.renderPublicDashboard()}</div>
        }



        return (
            <div>{this.renderAuthenticatedDashboard()}</div>
        );
    }
}

const mapStateToProps = state => {

    return {

    };
};

const authWrapped = withAuth0(Dashboard)

export default connect(
    mapStateToProps,
)(authWrapped);