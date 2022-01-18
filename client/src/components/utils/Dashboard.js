import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";

import { HomesListByUser, LoginButton, Loading } from "../exportedComponents"
import homelyLogo from "./favicon.ico"

class Dashboard extends Component {
    renderPublicDashboard() {
        return (
            <div className="public-dashboard ui centered grid ">
                <div className="center aligned thirteen wide column">
                    <img src={homelyLogo} alt={"home logo"}/>
                    <h3>Hello & welcome to Homely App!</h3> <br/>
                    <p><q>A minimalistic app to organize and divide your tasks, collect rewards and <b>turn your house into a home</b></q></p>
                    <p>The idea was born from founder Lisa Medina's past struggles of flat sharing with other students who weren't
                        big fans of cleaning after themselves.
                        She decided to turn something others hated into a game through a reward and point system.
                        Today Homely App is not only used by lazy students, but by families who want to teach their children
                        how to tidy-up, partners who want to turn their spaces into a love nest, and many more! So don't be shy
                        and join our Homely Family today!!
                    </p>
                    <button className="drawn-button"><i className={`large middle aligned icon hand point right`}/>
                        <LoginButton/></button>
                </div>

            </div>
        );
    }

    renderAuthenticatedDashboard() {
        return (
            <div className="ui centered grid ">
                <HomesListByUser />
                <div className="center aligned sixteen wide column">
                    <Link to="/home/join">
                        <button className="drawn-button">Join a new house</button>
                    </Link>
                </div>
            </div>
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