import React from "react";
import Charts from "react-chartjs-2";

class StatDisplay extends React.Component {

    constructor(props) {
        super();

        this.state = {
            content: props.content
        };
    }

    render(props) {
        return ( 
            <div>
                <h3>{this.state.content}</h3>
            </div>
        );
    }

}

export default StatDisplay;