import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withAuth0} from "@auth0/auth0-react";
import { deleteHome, fetchPopulatedHomes } from "../../actions";

import { Loading, ModalConfirmation } from "../exportedComponents"

class DeleteHomesList extends Component {
    componentDidMount() {
        this.props.fetchPopulatedHomes();
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

    confirmToDeleteHome(home) {
        this.props.deleteHome(home._id)
    }

    renderList() {
        if (this.props.auth0.isAuthenticated !== true) {
            return <div className="ui centered grid "><Loading/></div>
        }
        return this.props.homes.map(home => {
 
            return (

                this.doesUserBelongHome(home) &&
                <div className="row " key={home._id}>
                    <div className="center aligned six wide column">
                        <div>
                            <i className="large middle aligned icon home"/><p>{home.name}</p>
                        </div>

                    </div>
                    <div className=" center aligned six wide column">
                        <ModalConfirmation queryMessage="Are u sure you want to delete" introButtonMessage="Delete"
                                           delete={this.props.deleteHome} item={home} confirmButtonMessage="Delete"/>
                    </div>
                </div>
            )
                ;
        });
    }

    render() {
        return (
            <div className="ui centered grid ">
                <div className="center aligned sixteen wide column">
                    <h2> My Homes</h2>
                </div>

                {this.renderList()}


            </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        homes: Object.values(state.homes)
    };
};

const authWrapped = withAuth0(DeleteHomesList)

export default connect(
    mapStateToProps,
    {fetchPopulatedHomes, deleteHome}
)(authWrapped);
