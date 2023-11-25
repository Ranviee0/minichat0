import { NavLink } from "react-router-dom";
import React from 'react'
import "./App.css";

function Navbar() {
    return (
        <div className="flex-container">
            <div>
                <NavLink to="/">Home</NavLink>
            </div>
            <div>
                <NavLink to="/chat/1">Chat</NavLink>
            </div>
            <div>
                <NavLink to="/search">Text</NavLink>
            </div>
            <div>
                <NavLink to="/findall">Find All</NavLink>
            </div>
        </div>
    )
}

export default Navbar