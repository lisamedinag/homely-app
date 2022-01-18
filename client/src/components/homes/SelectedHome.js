import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Loading } from "../exportedComponents"

class SelectedHome extends Component {


    render() {
        if (this.props.selectedHome === null) {
            return <div className="ui centered grid "><Loading /></div>
        }
        return (

            <div className="ui centered grid ">
                <div className="center aligned sixteen wide column">
                    <h2>{this.props.selectedHome.name}</h2>
                </div>
                <div className="center aligned sixteen wide column">
                    <Link to="/home/dashboard/users">
                        <button className="button drawn-button">Users</button>
                    </Link>
                </div>
                <div className="center aligned sixteen wide column">
                    <Link to="/home/dashboard/tasks">
                        <button className="button drawn-button">Tasks</button>
                    </Link>
                </div>
                <div className="center aligned sixteen wide column">
                    <Link to="/home/dashboard/rewards">
                        <button className="button drawn-button">Rewards</button>
                    </Link>
                </div>

                <div className="row">
                    <div className="center aligned six wide column">
                        <Link to="/home/dashboard/edit">
                            <button className="drawn-button">Edit</button>
                        </Link>
                    </div>
                    <div className="center aligned six wide column">
                        <Link to="/home/dashboard/invite">
                            <button className="drawn-button">Invite</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { selectedHome: state.selectedHome };
};

export default connect(mapStateToProps)(SelectedHome);
