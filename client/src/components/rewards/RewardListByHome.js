import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {fetchRewards, selectReward} from "../../actions";

import { Loading } from "../exportedComponents"

class RewardListByHome extends Component {
    componentDidMount() {
        this.props.fetchRewards()
    }

    renderList() {

        return (this.props.rewards.map(reward => {
            let rewardIcon
            if (reward.status === 'AVAILABLE'){ rewardIcon = "circle outline"}
            else if (reward.status === 'CLAIMED'){rewardIcon = "dot circle outline"}
            else {rewardIcon = "dot circle"}
            let rewardColor = reward.status === 'AVAILABLE' ? "#A8A1F28E" : "#6D61E78E"
            if (reward.home === this.props.selectedHome._id) {
                return (
                    <div key={reward._id} className="sixteen wide column evenboxinner reward-highlight"
                         style={{backgroundColor: rewardColor}}>
                        <Link to="/home/dashboard/rewards/details">
                            <div className="item"
                                 onClick={() => this.props.selectReward(reward)}><i
                                className={`large middle aligned icon ${rewardIcon}`}/><p
                                className="curly">{reward.name}</p></div>
                        </Link>
                    </div>

                )

            }

        }))
    }

    render() {
        if (this.props.selectedHome && this.props.rewards) {
            return (
                <div className="ui centered grid">
                    <div className="center aligned sixteen wide column">
                        <h2>Rewards List of {this.props.selectedHome.name}</h2>
                    </div>

                    <div className="centered aligned  celled list box box 1">{this.renderList()}</div>

                    <div className="center aligned sixteen wide column">
                        <Link to="/home/dashboard/rewards/new">
                            <button className="drawn-button">Create new Reward</button>
                        </Link>
                    </div>
                </div>
            )
        } else {
            return <div className="ui centered grid"><Loading/></div>
        }
    }
}

const mapStateToProps = state => {
    return {
        rewards: Object.values(state.rewards),
        selectedHome: state.selectedHome
    };
};

export default connect(
    mapStateToProps, {fetchRewards, selectReward}
)(RewardListByHome);