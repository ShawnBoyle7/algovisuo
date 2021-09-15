import React from "react";
import EditUserFormModal from "../EditUserFormModal";
import LearningPath from "../LearningPath";
import "./Profile.css"
import DeleteUserModal from "../DeleteUserModal";

function Profile({ sessionUser }) {

    return (
            sessionUser &&
            <>
                <div className='profile-banner'>
                    <div className='profile-card'>
                        <img className='profile-image' src={sessionUser.imgUrl}/>
                        <EditUserFormModal/>
                        <h3 className='username'>{sessionUser.username}</h3>
                    </div>
                    <div className='profile-details'>
                        <ul>
                            <li className='full-name'>{sessionUser.firstName} {sessionUser.lastName}</li>
                            <li className='email'>{sessionUser.email}</li>
                        </ul>
                    </div>
                </div> 
                <h1>{sessionUser.username}'s Profile</h1>
                <LearningPath />
                <DeleteUserModal/>
            </>
    )
}

export default Profile
