import React from 'react';
import {Helmet} from "react-helmet";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; 


export default class registro extends React.Component {
  constructor(){
    super()
    this.nombre = React.createRef()
    this.correo = React.createRef()
    this.edad = React.createRef()
    this.pass = React.createRef()
  } 

  registrar = async () => {
    try {
    // console.log(this.nombre)
      console.log(this.nombre.current.value)

        const sendUri = 'http://35.239.230.74:3010/'
        //const sendUri = 'http://localhost:3010/'
        const nombre = this.nombre.current.value
        const correo = this.correo.current.value
        const edad = this.edad.current.value
        const pass = this.pass.current.value
        
        const bodyJSON = {
          nombre: nombre,
          correo: correo,
          edad: edad,
          pass: pass
        };

        const response = await fetch(sendUri, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyJSON)
        })
        const responseJson = await response.json().then(r => {
          //console.log(`Response1: ${r.error.name}`)
          if(r[0]!==undefined&&r[0].NOMBRE===nombre){
          
          confirmAlert({
            title: "Registro con éxito",
            message: "El usuario se ha registrado con éxito.",
            buttons: [
              {
                label: "Aceptar",
                onClick: () => {
                  this.props.history.push('/entrar')
                }
              }
              
            ]
          });

          }else if (r.error.name==='error01') {
            confirmAlert({
              title: "¡Error!",
              message: "El correo ya éxiste.",
              buttons: [
                {
                  label: "Aceptar",
                  onClick: () => {
                  //  this.props.history.push("/entrar");
                  }
                }
              ]
            });
          }
        })
        

    } catch (e) {
        console.log(`Error: ${e}`)
    }
};

  render(){
            return (
              <>
                <Helmet>
                  <title>Registro de usuarios</title>
                  <meta name="description" content="Helmet application" />
                </Helmet>
                <div className="App">
                  <header className="App-header">
                    <h1> REGISTRO DE USUARIOS </h1>

                    <div
                      style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        padding: 15,
                        borderRadius: 5
                      }}
                    >
                      <div>
                        <table style={{ width: "100%" }}>
                          <tbody>
                            <tr>
                              <td style={{ textAlign: "left" }}>Nombre:</td>
                              <td>
                                <input ref={this.nombre} type="text" />
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "left" }}>Correo:</td>
                              <td>
                                <input ref={this.correo} type="text" />
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "left" }}>Edad:</td>
                              <td>
                                <input ref={this.edad} type="number" />
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "left" }}>Contraseña:</td>
                              <td>
                                <input ref={this.pass} type="password" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <br />
                      <div
                        style={{
                          display: "flex",
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flex: 1,
                            alignItems: "flex-start",
                            justifyContent: "flex-end"
                          }}
                        >
                          <button onMouseUp={this.registrar} className="btn btn-primary">REGISTRAR</button>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flex: 1,
                            alignItems: "flex-start",
                            justifyContent: "flex-end"
                          }}
                        >
                          <Link to="/entrar" className="link">
                            <button className="btn btn-danger">CANCELAR</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </header>
                </div>
              </>
            );
          }
}

