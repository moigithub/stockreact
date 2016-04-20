// react main
/*global $*/
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';


require("./styles.css");


class Main extends React.Component {
    constructor(props){
        super(props);
        this.getBars = this.getBars.bind(this);
    }
    
    getBars(e){
        e.preventDefault();
        
        
        var location = this.refs.location.value||"";
        var URL = '/api/bars/'+ location;

        
        $.getJSON(URL)
        .done(function(data) {
            console.log( "data" , data);
          })
          .fail(function() {
            console.log( "error" );
          })
    }
    
    render(){
        
        return (
            <div>
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

                <div className="container-fluid">    
                    <h1 className="text-center">Plans tonight?</h1>
                    <h3 className="text-center">See which bars are hoppin' tonight and RSVP ahead of time!</h3>
                    <h6 className="text-center">Remember: take a cab and drink responsibly.</h6>
                    
                    
                    <div className="row">
                        <div className="col-md-8">
                        <form onSubmit={this.getBars}>
                            <div className="input-group">
                              <input type="text" ref="location" className="form-control" placeholder="... Where do you wanna go tonight?" aria-label="location"/>
                              <span className="input-group-btn">
                                <button className="btn btn-danger" type="submit"><span className="glyphicon glyphicon-search"></span> Search a place!</button>
                              </span>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>

            </div>  
        );
    }
}

ReactDOM.render(<Main/>, document.getElementById("app"));