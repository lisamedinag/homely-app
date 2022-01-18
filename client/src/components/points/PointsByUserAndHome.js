import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPointsByUserAndHome} from "../../actions";

import { Loading } from "../exportedComponents"

class PointsByUserAndHome extends Component {
    componentDidMount() {
 
        if (this.props.selectedHome && this.props.selectedUser ){
 
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

