import './Header.css';
import React from "react";

type HeaderProps = {
    title: string;
};

export const Header: React.FC<HeaderProps> = ({ title })  => {
    return (
        <div className="header">
            <span className="title">{title}</span>
        </div>
    );
}
