import React, { Component } from 'react';

import { connect } from "react-redux";
import Loading from "../utils/Loading";

import { selectUser } from "../../actions";
import { Link } from "react-router-dom";


class UsersListByHome extends Component {

    renderUserList() {
        
        return this.props.selectedHome.usersArr.map(user => {
            return (
                <div className="sixteen wide column" key={user}>
                    <Link to="/home/dashboard/users/profile">
                        <div onClick={() => this.props.selectUser(user)}>{user}</div>
                    </Link>
                </div>

            )
        })
    }

    render() {
        if (this.props.selectedHome) {
            return (
                <div className="ui centered grid">
                    <div className="center aligned sixteen wide column">
                        <h2>User List of {this.props.selectedHome.name}</h2>
                    </div>
                    <div className="celled list">{this.renderUserList()}</div>
                </div>
            )
        } else {
            return <div className="ui centered grid"><Loading /></div>
        }
    }
}



const mapStateToProps = state => {
    return { selectedHome: state.selectedHome };
};

export default connect(
    mapStateToProps, { selectUser }
)(UsersListByHome);
