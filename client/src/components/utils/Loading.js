import React, { Component } from 'react';

class Loading extends Component {
    render() {
        return (
            <div className=" loadingClass ui center aligned segment">
                <div className="ui active centered inline loader"></div>
                <p className="">Loading</p>
            </div>
        );
    }
}

export default Loading;