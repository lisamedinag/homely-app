import React, {Component} from 'react';
import { connect } from "react-redux";
import { fetchHomes, fetchPopulatedHomes } from "../../actions";
import {Loading} from "../exportedComponents";


class HomesListAll extends Component {
    componentDidMount() {
        this.props.fetchPopulatedHomes();
    }

    renderUser(home){
        return home.usersArr.map(user => {
            return (
                <div key={user._id}>{user.name}</div>
            )
        })
    }

    renderList() {

        return this.props.homes.map(home => {
            return (
                <div className="item" key={home._id}>
                    <i className="large middle aligned icon camera" />
                    {home.name}
                    <div className="content">
                        <div className="description">{this.renderUser(home)}</div>
                    </div>
                </div>
            );
        });
    }
    render() {
        if (this.props.homes  === null) {
            return <div className="ui centered grid "><Loading/></div>
        }

        return (
                <div>
                    <h2>Homes</h2>
                    <div className="ui celled list">{this.renderList()}</div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        homes: Object.values(state.homes),

    };
};

export default connect(
    mapStateToProps,
    { fetchHomes, fetchPopulatedHomes }
)(HomesListAll);

