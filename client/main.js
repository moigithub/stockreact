// react main
/*global $*/
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.
//const ReactHighstock = require('react-highcharts/ReactHighstock');
var ReactHighstock = require('react-highcharts/dist/ReactHighstock.src');

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


class AddSymbolForm extends React.Component {
    constructor(props){
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        var newData = {symbol:this.refs.symbol.value};
        
        $.post( "/api/stocks", newData ,null, "json")
          .done(function( data ) {
                console.log(data);
        
          })
         .fail(function() {
                console.error( "error getting api/votes data" );
          });
    }
        
    render(){
        return (
            <div className="col-xs-12 col-sm-6 col-md-4">
                <div className="panel panel-success">
                  <div className="panel-heading">
                    <h3 class="panel-title">Add new Symbol:</h3>
                        
                  </div>
                  <div class="panel-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group  input-group-lg">
                              <input type="text" ref="symbol" name="symbol" placeholder="Enter symbol name here" className="form-control" />
                              <span className="input-group-btn">
                                <button type="submit" className="btn btn-lg btn-success" id="addStock">
                                    <span className="glyphicon glyphicon glyphicon-ok-sign" aria-hidden="true"></span> Add
                                </button> 
                              </span>
                            </div>
                            
                        </form>
                  </div>
                </div>
            </div>
            );
    }
}


class Symbol extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div className="col-xs-12 col-sm-6 col-md-4">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <h3 className="panel-title">{this.props.name}
                        <button className="close">
                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </button> 
                    </h3>
                  </div>
                  <div class="panel-body">
                    {this.props.desc}
                  </div>
                </div>
            </div>
            
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
        var seriesOptions=[];
        seriesOptions=[{
            name: 'AAPL',
            data: [[1220832000000, 22.56], [1220918400000, 21.67], [1221004800000, 21.66], [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 20.05], [1221523200000, 19.98], [1221609600000, 18.26], [1221696000000, 19.16], [1221782400000, 20.13], [1222041600000, 18.72], [1222128000000, 18.12], [1222214400000, 18.39], [1222300800000, 18.85], [1222387200000, 18.32], [1222646400000, 15.04], [1222732800000, 16.24], [1222819200000, 15.59], [1222905600000, 14.3], [1222992000000, 13.87], [1223251200000, 14.02], [1223337600000, 12.74], [1223424000000, 12.83], [1223510400000, 12.68], [1223596800000, 13.8], [1223856000000, 15.75], [1223942400000, 14.87], [1224028800000, 13.99], [1224115200000, 14.56], [1224201600000, 13.91], [1224460800000, 14.06], [1224547200000, 13.07], [1224633600000, 13.84], [1224720000000, 14.03], [1224806400000, 13.77], [1225065600000, 13.16], [1225152000000, 14.27], [1225238400000, 14.94], [1225324800000, 15.86], [1225411200000, 15.37], [1225670400000, 15.28], [1225756800000, 15.86], [1225843200000, 14.76], [1225929600000, 14.16], [1226016000000, 14.03], [1226275200000, 13.7], [1226361600000, 13.54], [1226448000000, 12.87], [1226534400000, 13.78], [1226620800000, 12.89], [1226880000000, 12.59], [1226966400000, 12.84], [1227052800000, 12.33], [1227139200000, 11.5], [1227225600000, 11.8], [1227484800000, 13.28], [1227571200000, 12.97], [1227657600000, 13.57], [1227830400000, 13.24], [1228089600000, 12.7], [1228176000000, 13.21], [1228262400000, 13.7], [1228348800000, 13.06], [1228435200000, 13.43], [1228694400000, 14.25], [1228780800000, 14.29], [1228867200000, 14.03], [1228953600000, 13.57], [1229040000000, 14.04], [1229299200000, 13.54]],
            tooltip: {
              valueDecimals: 2
            }
          }]
        //procesa state.stockList pa generar seriesOptions.
        
        // [{name:'AAPL',data[[unixtime, value],[unixtime,value]]},
        //  {name:'AAPL',data[[unixtime, value],[unixtime,value]]},
        //  {name:'AAPL',data[[unixtime, value],[unixtime,value]]},]
        
        var config = {
          rangeSelector: {
                selected: 4
            },

            yAxis: {
                labels: {
                    formatter: function () {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },

            series: seriesOptions
        };
        
        ////////.

        return (
            <div>
                <div id="chart">
                    <ReactHighstock config = {config}></ReactHighstock>
                </div>
                <hr/>

                <div id="stockList">
                    <div className="row">
                        <AddSymbolForm/>
                        <Symbol desc="hola" name="MSGT" />
                        <Symbol desc="asdfsdf" name="AAPL" />
                        <Symbol desc="hoadsfasdfla" name="NASQ" />
                        <Symbol desc="hoadsfsdfla" name="FB" />
                        <Symbol desc="4534534" name="TWRE" />

                    </div>
                </div>
            </div>
            );
    }
    
}    


ReactDOM.render(<Main/>, document.getElementById("app"));