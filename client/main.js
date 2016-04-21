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
            <li className="list-group-item list-group-item-success">
                <div className="media">
                  <div className="media-left">
                      <img className="media-object" src={this.props.place.snippet_image_url} alt={this.props.place.name+" image"} />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">{this.props.place.name}</h4>
                    <p className="snippet">{this.props.place.snippet_text}</p>
                    <p className="address">{this.props.place.location.display_address.join(" - ")}</p>
                  </div>
                  <div className="pull-right">
                    <button className="btn btn-sm btn-success" onClick={this.props.register}><span className="badge">4 Going</span> Count me in!</button>
                  </div>
                </div>
            </li>
        );
    }
}

class Main extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            places:[],
            search:'',
            userId:123
        };
        
        
        this.getBars = this.getBars.bind(this);
        this.registerPlace = this.registerPlace.bind(this);
    }
    
    getBars(e){
        
        
        e.preventDefault();
        
        
        var location = this.refs.place.value;
        var component = this;
        if(!location){
            alert("getting location");
            getLocationByIP(function(ipdata){
                location=ipdata.city;
                
                this.setState({search: location});
                getBarsByLocation(location, function(err, data){
                    if (err) {
                        console.error(err);
                        throw err;
                    }
                    console.log( "data" , data);
                    component.setState({places: data.businesses});
                });

            });
        } else {
            this.setState({search: location});
            getBarsByLocation(location, function(err, data){
                if (err) {
                    console.error(err);
                    throw err;
                }
                console.log( "data" , data);
                component.setState({places: data.businesses});
            });
        }
    }
    
    
    registerPlace(place){
        console.log(place, this.state);
        var URL='/api/places';
        $.post(URL,{
            placeId:place.id,
            search: this.state.search,
            userId: this.state.userId
        })
            .done(function(data){
                console.log("registered",data);
            });
    }
    
    render(){
        
        return (
            <div>
                <nav className="menu navbar navbar-default navbar-inverse">
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

                <div className="container">    
                    <h1 className="text-center">Plans tonight?</h1>
                    <h3 className="text-center">See which bars are hoppin' tonight and RSVP ahead of time!</h3>
                    <h6 className="text-center">Remember: take a cab and drink responsibly.</h6>
                    
                    
                    <div className="row">
                        <div className="col-md-12">
                        <form onSubmit={this.getBars} className="form-horizontal">
                            <div className="input-group">
                              <input type="text" ref="place" className="form-control" placeholder="... Where do you wanna go tonight?" aria-label="location"/>
                              <span className="input-group-btn">
                                <button className="btn btn-danger" type="submit"><span className="glyphicon glyphicon-search"></span> Search a place!</button>
                              </span>
                            </div>
                        </form>
                        </div>
                    </div>
                
                    <div className="places row">
                        <ul className="list-group col-md-12">
                        {this.state.places.map(function(place, i){
                            return <Place place={place} key={place.id} register={this.registerPlace.bind(null,place)}/>
                        }.bind(this))}
                        </ul>
                    </div>
                </div>
            </div>  
        );
    }
}

////////// HELPERS
function getLocationByIP(callback){
    var IPAPI = "http://ip-api.com/json/?callback=?";
    $.getJSON(IPAPI)
        .done(function(ipdata){
            if(ipdata.status=="success"){
                callback(ipdata);
            }
        });

}

function getBarsByLocation(location, callback){
    var URL = '/api/bars/'+ location;
    $.getJSON(URL)
        .done(function(data) {
            callback(null, data);
        })
        .fail(function( jqXHR, textStatus, err ) {
            callback(err)
        })
    
}
/////////

ReactDOM.render(<Main/>, document.getElementById("app"));