import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {withAuth0} from "@auth0/auth0-react";
import {selectUser} from "../../actions";

import { Loading } from "../exportedComponents"

class UsersListByHome extends Component {

    renderUserList() {

        return this.props.selectedHome.usersArr.map(user => {
        let taskIcon = user === this.props.auth0.user.name ? "sun" : "moon outline"
        let taskColor = user  === this.props.auth0.user.name ? "#46C1F58E" : "#A1DCF28E"
            return (
                <div className="sixteen wide column evenboxinner highlight" key={user} style={{backgroundColor: taskColor}}>
                    <Link to="/home/dashboard/users/profile">
                        <div onClick={() => this.props.selectUser(user)}><i
                            className={`large middle aligned icon ${taskIcon}`}/><p
                            className="curly">{user}</p>
                        </div>
                    </Link>
                </div>

            )
        })
    }

    render() {
        if (this.props.selectedHome) {
            return (
                <div className="ui centered grid">
                    <div
                        className="center aligned sixteen wide column list center aligned sixteen wide column  box box 1">
                        <h2>User List of {this.props.selectedHome.name}</h2>
                    </div>
                    <div className="celled list">{this.renderUserList()}</div>
                </div>
            )
        } else {
            return <div className="ui centered grid"><Loading/></div>
        }
    }
}


const mapStateToProps = state => {
    return {selectedHome: state.selectedHome};
};
const authWrapped = withAuth0(UsersListByHome)
export default connect(
    mapStateToProps, {selectUser}
)(authWrapped);
