import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPopulatedHomes, selectHome } from "../../actions";

import { Link } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import Loading from "../utils/Loading";

// import {useAuth0} from "@auth0/auth0-react";
// TODO change class to function to be able to get user from useAuth0


class HomesListByUser extends Component {
    componentDidMount() {
        this.props.fetchPopulatedHomes();
        // const { user, isAuthenticated, isLoading } = useAuth0();
    }

    renderUserList(home) {
        return home.usersArr.map(user => {

            return (
                <div key={user._id}>{user.name}</div>
            )
        })
    }

    doesUserBelongHome(home) {
        let result = false
        if (this.props.auth0.isAuthenticated === true && home.usersArr) {
            home.usersArr.map(user => user === this.props.auth0.user.email ? result = true : null)
        }
        return result
    }

    renderList() {
        if (this.props.auth0.isAuthenticated !== true) {
            return <div className="ui centered grid "><Loading /></div>
        }
        return this.props.homes.map(home => {

            return (

                this.doesUserBelongHome(home) &&
                <div className="sixteen wide column" key={home._id}>
                    <Link to="/home/dashboard">
                        <div className="item" onClick={() => this.props.selectHome(home)}>
                            <i className="large middle aligned icon home" />
                            {home.name}
                        </div>
                    </Link>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="ui centered grid ">
                <div className="center aligned sixteen wide column">
                    <h2>Homes</h2>
                </div>

                <div className="celled list">{this.renderList()}</div>

                <div className="center aligned sixteen wide column">
                    <Link to="home/new">
                        <button className="button ">Create new Home</button>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        homes: Object.values(state.homes)
    };
};

const authWrapped = withAuth0(HomesListByUser)

export default connect(
    mapStateToProps,
    { fetchPopulatedHomes, selectHome }
)(authWrapped);
