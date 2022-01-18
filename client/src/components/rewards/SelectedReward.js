import React, { Component } from 'react';
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import {deleteReward} from "../../actions";

import { Loading, AutoAssignOrCompleteRewardButton, ModalConfirmation } from "../exportedComponents"


class SelectedReward extends Component {

    confirmToDeleteReward(reward){

        this.props.deleteReward(reward._id)
    }


    render() {
        if (this.props.selectedReward === null) {
            return <div><Loading/></div>
        }
 
        return (
            <div className="ui centered grid ">
                <div className="center aligned sixteen wide column">
                    <h2>{this.props.selectedReward.name}</h2>
                </div>
                <div className="center aligned sixteen wide column">
                    <p>Description:
                        <br/> {this.props.selectedReward.description}</p>
                </div>
                <div className="center aligned sixteen wide column">
                    <p>Reward points: {this.props.selectedReward.pointsWorth}</p>
                </div>
                <div className="center aligned sixteen wide column">
                    <p>Reward status: {this.props.selectedReward.status}</p>
                </div>


                <AutoAssignOrCompleteRewardButton/>

                <div className="row ">
                    <div className="center aligned six wide column">
                        <Link to="/home/dashboard/rewards/edit">
                            <button className="drawn-button">Edit</button>
                        </Link>
                    </div>
                    <div className=" center aligned six wide column">
                        <ModalConfirmation queryMessage="Are u sure you want to delete" introButtonMessage="Delete"
                                           delete={this.props.deleteReward} item={this.props.selectedReward}
                                           confirmButtonMessage="Delete"/>
                    </div>

                </div>

            </div>
        );
    }
}


const mapStateToProps = state => {
    return {selectedReward: state.selectedReward};
};

export default connect(mapStateToProps, {deleteReward})(SelectedReward);
