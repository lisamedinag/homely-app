import React, { Component } from 'react';

import { connect } from "react-redux";
import Loading from "../utils/Loading";
import { Link } from "react-router-dom";


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
                        <button className="button">Users</button>
                    </Link>
                </div>
                <div className="center aligned sixteen wide column">
                    <Link to="/home/dashboard/tasks">
                        <button className="button">Tasks</button>
                    </Link>
                </div>
                <div className="center aligned sixteen wide column">
                    <Link to="/home/dashboard/rewards">
                        <button className="button">Rewards</button>
                    </Link>
                </div>
                <div className="center aligned sixteen wide column">
                    <Link to="/home/dashboard/edit">
                        <button className="button">Edit</button>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { selectedHome: state.selectedHome };
};

export default connect(mapStateToProps)(SelectedHome);
