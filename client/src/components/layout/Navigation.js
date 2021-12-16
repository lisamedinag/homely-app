import React, {Component} from 'react';
import AuthenticationButton from "../auth/AuthenticationButton";
import {Link} from "react-router-dom";

import history from "../../history";
// import { useHistory } from "react-router-dom";

function Navigation()  {
    // let history = useHistory();

    function handleClick() {
        history.goBack();
    }

        return (
            <div className="row menu">

                <div className="ui column centered grid">
                    <Link to="/">
                        <h1>Homes App</h1>
                    </Link>
                    <Link to="/profile">
                        <h3>Profile</h3>
                    </Link>
                    <button onClick={handleClick}>back</button>
                    <AuthenticationButton/>
                </div>


            </div>
        );

}

export default Navigation;