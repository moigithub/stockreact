// react main
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';


require("./styles.css");


class Main extends React.Component {
    constructor(props){
        super(props);
    }
    
    
    render(){
        
        return (
            <div>
                <h1>Nightlife app</h1>
                <nav className="menu navbar navbar-default">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#topmenu" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a href="#" className="navbar-brand">Home</a>
                    </div>
                    
                    <div className="collapse navbar-collapse" id="topmenu">
                        <ul className="nav navbar-nav navbar-right">
                            <li className="navbar-text">Login with</li>
                            <li><a href="#">Twitter</a></li>
                        </ul>
                    </div>
                </nav>
            </div>  
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById("app"));