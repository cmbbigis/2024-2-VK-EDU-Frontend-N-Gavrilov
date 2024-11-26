import React from 'react';

import './profilePage.scss';
import { ProfileHeader, ProfileInfo } from '../../components/profile';

export const ProfilePage = () => {
    return (
        <div className="profilePage">
            <ProfileHeader />
            <ProfileInfo />
        </div>
    );
}
