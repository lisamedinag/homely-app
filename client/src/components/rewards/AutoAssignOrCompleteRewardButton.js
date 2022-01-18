import React, {Component} from "react";
import {connect} from "react-redux";
import { withAuth0 } from "@auth0/auth0-react";
import { buyReward, fetchPointsList, updateStatusAndUserAssignedReward } from "../../actions";

import { Loading } from "../exportedComponents"

let userPoints;

class AutoAssignOrCompleteRewardButton extends Component {
    componentDidMount() {
        this.props.fetchPointsList()
    }

    updateReward = (rewardId, desiredStatus, userId) => {
        this.props.updateStatusAndUserAssignedReward(rewardId, desiredStatus, userId);
        this.updatePoints(desiredStatus, userId);
    }



    updatePoints(desiredStatus, userId) {
        if (desiredStatus === "CLAIMED") {
            this.props.buyReward(
                userId, this.props.selectedHome._id, this.props.selectedReward.pointsWorth
            )
        }
    }
    checkUserPoints() {
        // console.log(userPoints, "up_start")
    }

    render() {
        this.checkUserPoints()
        const userId = this.props.auth0.user.email;
        const selectedReward = this.props.selectedReward;
        if (selectedReward === null || selectedReward === undefined) {
            return <div><Loading/></div>
        }

        if (selectedReward.status === "AVAILABLE") {
            return (
                <div className="center aligned sixteen wide column">
                    <button className="drawn-button"
                            onClick={() => this.updateReward(selectedReward._id, "CLAIMED", userId)}>
                        I'd like this reward!
                    </button>
                </div>
            )
        } else if (selectedReward.status === "CLAIMED" && selectedReward.claimedByUser === userId) {
            return (
                <div>
                    <div className="center aligned sixteen wide column">
                        <button
                            className="drawn-button"
                            onClick={() => this.updateReward(selectedReward._id, "COMPLETED", userId)}>
                            Redeem reward
                        </button>
                    </div>
                    <br/>
                    <div className="center aligned sixteen wide column">
                        <button
                            className="drawn-button"
                            onClick={() => this.updateReward(selectedReward._id, "AVAILABLE", userId)}>
                            Resign reward
                        </button>
                    </div>
                </div>)
        }
        return <div/>
    }
}

const mapStateToProps = state => {
    return {
        selectedReward: state.selectedReward,
        selectedHome: state.selectedHome,
        points: state.points
    };

};
const authWrapped = withAuth0(AutoAssignOrCompleteRewardButton);

export default connect(
    mapStateToProps, {updateStatusAndUserAssignedReward, buyReward, fetchPointsList}
)(authWrapped);