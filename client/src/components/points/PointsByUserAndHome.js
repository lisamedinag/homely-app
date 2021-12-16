import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchPointsByUserAndHome} from "../../actions";
import Loading from "../utils/Loading";



class PointsByUserAndHome extends Component {
    componentDidMount() {
        console.log("did ount")
        if (this.props.selectedHome && this.props.selectedUser ){
            console.log("inside the fetch fun")
            this.props.fetchPointsByUserAndHome(this.props.selectedUser, this.props.selectedHome)
        }

    }



    render() {
        if (this.props.points === {}) {
            return <div><Loading/></div>
        }
        return (

            <div>
                {/*<h1>{this.props.points[this.props.selectedUser].amount}</h1>*/}
            </div>
        );
    }
}


const mapStateToProps = state => {
    console.log(state, "state")
    console.log(state.selectedHome, state.selectedUser, "test state")
    return {
        points: state.points,
        selectedHome: state.selectedHome,
        selectedUser: state.selectedUser
        // selectedHome: dummyHouseId,
        // selectedUser: dummyUserId
    };
};

export default connect(
    mapStateToProps,
    {fetchPointsByUserAndHome}
)(PointsByUserAndHome);

