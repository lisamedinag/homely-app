import React from "react";
import {useAuth0} from "@auth0/auth0-react";

import { Loading, DeleteHomesList, UserStatistics } from "../components/exportedComponents"


const Profile = () => {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <div><Loading/></div>;
    }

    return (
        isAuthenticated && (
            <div className="ui centered grid ">
                <div className="center aligned sixteen wide column">
                    <img src={user.picture} alt={user.name}/>
                </div>
                <div className="center aligned sixteen wide column">
                    <h2>{user.name}</h2>
                </div>
                <div className="center aligned sixteen wide column">
                    <p>{user.email}</p>
                </div>
                <div className="center aligned sixteen wide column">
                    <p>{user.id}</p>
                </div>

                <DeleteHomesList/>
                <UserStatistics/>
            </div>
        )
    );
};

export default Profile