import React, { Component } from 'react';
import { connect } from "react-redux";
import Loading from "../utils/Loading";
import AutoAssignOrCompleteRewardButton from "./AutoAssignOrCompleteRewardButton";
import {Link} from "react-router-dom";

class SelectedReward extends Component {
    render() {
        if (this.props.selectedReward === null) {
            return <div><Loading /></div>
        }

        console.log(this.props.selectedReward)
        return (
            <div className="ui centered grid ">
                <div className="center aligned sixteen wide column">
                    <h2>{this.props.selectedReward.name}</h2>
                </div>
                <div className="center aligned sixteen wide column">
                    <p>Description:
                        <br /> {this.props.selectedReward.description}</p>
                </div>
                <div className="center aligned sixteen wide column">
                    <p>Reward points: {this.props.selectedReward.pointsWorth}</p>
                </div>
                <div className="center aligned sixteen wide column">
                    <p>Reward status: {this.props.selectedReward.status}</p>
                </div>




                {/*{this.props.selectedReward.claimedByUser &&*/}
                {/*    <div className="center aligned sixteen wide column">*/}
                {/*        <p>Task assigned user: {this.props.selectedTask.claimedByUser}</p>*/}
                {/*    </div>*/}
                {/*}*/}

                <AutoAssignOrCompleteRewardButton/>

                <div className="center aligned sixteen wide column">
                    <Link to="/home/dashboard/rewards/edit">
                        <button className="button">Edit</button>
                    </Link>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return { selectedReward: state.selectedReward };
};

export default connect(mapStateToProps)(SelectedReward);
