import React from "react";

class Header extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div id='header'>
                <img src='images/SDHacks.png' id='logo' />
                <p id='title' >Political Bias Detector</p>
            </div>
        )
    }
}

export default Header