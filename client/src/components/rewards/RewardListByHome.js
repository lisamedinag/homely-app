import React, { Component } from 'react';

import { connect } from "react-redux";
import Loading from "../utils/Loading";

import { fetchRewards, selectReward } from "../../actions";
import { Link } from "react-router-dom";

class RewardListByHome extends Component {
    componentDidMount() {
        this.props.fetchRewards()
    }

    renderList() {

        return (this.props.rewards.map(reward => {

            if (reward.home === this.props.selectedHome._id){
                return (<div key={reward._id}>
                    <Link to="/home/dashboard/rewards/details">
                        <div  onClick={() => this.props.selectReward(reward)}>{reward.name}</div>
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

                    <div className="celled list">{this.renderList()}</div>

                    <div className="center aligned sixteen wide column">
                        <Link to="/home/dashboard/rewards/new">
                            <button className="button">Create new Reward</button>
                        </Link>
                    </div>
                </div>
            )
        } else {
            return <div className="ui centered grid"><Loading /></div>
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
    mapStateToProps, { fetchRewards, selectReward }
)(RewardListByHome);