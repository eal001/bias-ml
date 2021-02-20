import React from "react";

class Header extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div id='header'>
                <img src='images/SDHackslogo.png' id='logo' />
            </div>
        )
    }
}

export default Header;