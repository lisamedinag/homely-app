import React, { Component } from 'react';

import { connect } from "react-redux";
import Loading from "../utils/Loading";


class SelectedUser extends Component {


    render() {
        if (this.props.selectedUser === null) {
            return <div><Loading /></div>
        }
        return (
            <div className="ui centered grid ">
                <div className="center aligned sixteen wide column">
                    <h2>{this.props.selectedUser}</h2>
                </div>
                <div className="celled list">Aqui irá la lista de rewards, tasks ...</div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return { selectedUser: state.selectedUser };
};

export default connect(mapStateToProps)(SelectedUser);