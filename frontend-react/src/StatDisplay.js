import React from "react";
import Charts from "react-chartjs-2";

class StatDisplay extends React.Component {

    constructor(props) {
        super();
    }

    render() {
        console.log(this.props.content);

        return ( 
            <div>
                <h3>{this.props.content}</h3>
            </div>
        );
    }

}

export default StatDisplay;