import React, {Component} from "react";
import {Link} from "react-router-dom";
import Loading from "../utils/Loading";
import {connect} from "react-redux";
import {

    updateStatusAndUserAssignedReward
} from "../../actions";
import {withAuth0} from "@auth0/auth0-react";

class AutoAssignOrCompleteRewardButton extends Component {

    updateReward = (rewardId, desiredStatus, userId) => {
        this.props.updateStatusAndUserAssignedReward(rewardId, desiredStatus, userId)
    }


    render() {
        console.log(this.props.selectedReward)
        const userId = this.props.auth0.user.email;
        const selectedReward = this.props.selectedReward;
        if (selectedReward === null || selectedReward === undefined) {
            return <div/>
        }

        if (selectedReward.status === "AVAILABLE") {
            return (
                <div>
                    you can claim this reward for yourself
                    <button
                        onClick={() => this.updateReward(selectedReward._id, "CLAIMED", userId)}>
                        I'd like this reward
                    </button>
                </div>
            )
        } else if (selectedReward.status === "CLAIMED" && selectedReward.assignedUser === userId) {
            //TODO FUNCTION TO SPEND POINTS TO GET THE REWARD
            return (
                <div>
                    <div>
                        Have you enjoyed your Reward
                        <button
                            onClick={() => this.updateReward(selectedReward._id, "COMPLETED", userId)}>
                            Yes!
                        </button>
                    </div>
                    <br/>
                    <div>
                        Do you want to renounce your reward? (you will have half your points back)
                        <button
                            onClick={() => this.updateReward(selectedReward._id, "AVAILABLE", userId)}>
                            Ok, I renounce it
                        </button>
                    </div>
                </div>)
        }
        return <div/>
    }
}

const mapStateToProps = state => {
    return {selectedReward: state.selectedReward};

};
const authWrapped = withAuth0(AutoAssignOrCompleteRewardButton);

export default connect(
    mapStateToProps, {updateStatusAndUserAssignedReward: updateStatusAndUserAssignedReward}
)(authWrapped);