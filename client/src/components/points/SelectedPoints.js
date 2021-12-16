import React, {Component} from 'react';

import {connect} from "react-redux";
import Loading from "../utils/Loading";


class SelectedPoints extends Component {


    render() {
        if (this.props.selectedPoints === null) {
            return <div><Loading/></div>
        }
        return (

            <div>
                <h1>{this.props.selectedPoints.amount}</h1>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {selectedPoints: state.selectedPoints};
};

export default connect(mapStateToProps)(SelectedPoints);
