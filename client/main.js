// react main
/*global $*/
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

require("./styles.css");


class Place extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div></div>
            );
    }
}

class Main extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            stockList:[],
        };
    }
    
    
    render(){
        return (
            <div></div>
            );
    }
    
}    


ReactDOM.render(<Main/>, document.getElementById("app"));