import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllTokens, fetchInvitationCode } from "../../actions";

import { Loading } from "../exportedComponents"

class HomeInviteGenerator extends Component {


    getCode() {
 
        this.props.fetchInvitationCode(this.props.selectedHome._id)
    }

    renderToken() {
        if (this.props.invitationCodes.length !== 0) {

            return (
                <p>{this.props.invitationCodes[0].token_key}</p>
            )
        }
    }

    render() {

        return (

            <div className="ui centered grid ">
                <div className="center aligned sixteen wide column">
                    <h2>{this.props.selectedHome.name}</h2>
                </div>
                <div className="center aligned sixteen wide column">
                    <button className="drawn-button" onClick={() => this.getCode()}>Get Invitation Code</button>

                </div>
                <div className="center aligned sixteen wide column">
                    {this.renderToken()}

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        selectedHome: state.selectedHome,
        invitationCodes: Object.values(state.invitationCodes)
    };
};

export default connect(mapStateToProps, { fetchInvitationCode, fetchAllTokens })(HomeInviteGenerator);