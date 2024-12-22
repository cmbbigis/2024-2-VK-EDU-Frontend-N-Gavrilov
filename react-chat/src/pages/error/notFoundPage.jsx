import React from "react";

import './notFoundPage.scss';

export const NotFoundPage = () => {
    return (
        <div className="error-page">
            <h1>Oops!</h1>
            <p>No such page was found</p>
            <p>404 Not Found</p>
        </div>
    );
}