import React, { Component } from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import reactBootstrap from "react-bootstrap";
import ChessBoard from "../BasicReactScaffold/src/component/bord.js";
import "../BasicReactScaffold/src/assets/css/App.sass";




export default class App extends Component{
   
   render(){
      return(
         <div>
            <h1>Traveling Knight</h1>
            <ChessBoard />
         </div>
      );
   }
}
