import React, { Component } from 'react';
import { Link } from "react-router-dom";
import history from "../../history";
// import { useHistory } from "react-router-dom";

import { AuthenticationButton } from "../exportedComponents"

function Navigation() {
    // let history = useHistory();

    function handleClick() {
        history.goBack();
    }

    return (
        <div className="row menu">

                <button onClick={handleClick} className="nav-button navbar-button"><i className=" large middle aligned icon angle left
"/></button>

                <Link to="/">
                    Homely App
                </Link>


                <Link to="/profile">
                    Profile
                </Link>



                <AuthenticationButton />


        </div>
    );

}

export default Navigation;