import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import entrar from './entrar';
import registro from './registro';
import inicio from "./inicio";

export default class App extends React.Component {
 
  render(){
    
            return (
              
              <BrowserRouter>
                <div>
                  
                    <Switch>
                      <Route
                        path="/"
                        exact component={entrar} />
                      <Route
                        path="/entrar"
                        exact component={entrar} />
                      <Route
                        path="/registro"
                        exact component={registro} />
                      <Route
                        path="/inicio"
                        exact component={inicio} />  
                    </Switch>

                </div>
              </BrowserRouter>
              
            );
          }
}

