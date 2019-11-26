import React from 'react';
import {Helmet} from "react-helmet";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; 
import cookie from "react-cookies";
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';


export default class entrar extends React.Component {
  state = {
    nombre: null,
    pass: null
  }

  constructor(){
    super()
    this.nombre = React.createRef()
    this.pass = React.createRef()

    if (cookie.load("pass") !== undefined) {
      this.state = { 
        nombre: cookie.load("nombre"), 
        pass: cookie.load("pass") 
      };
      const { nombre } = this.state;
      const { pass } = this.state;

      this.getData(nombre, pass);
    } else {
      this.props.history.push("/");
      this.removeCookie();
    }

  } 

  componentWillMount() {
    
    
  }

  removeCookie(){
    cookie.remove("nombre");
    cookie.remove("pass");
  }

  getData = async (nombre,pass) => {
        try {
          // console.log(this.nombre)
        //  console.log(this.nombre.current.value);

          const sendUri = 'http://35.239.230.74:3011/'
         // const sendUri = "http://localhost:3011/";
        // const nombre = this.nombre.current.value;
        // const pass = this.pass.current.value;

          const bodyJSON = {
            nombre: nombre,
            pass: pass
          };
          const response = await fetch(sendUri, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyJSON)
          });
          const responseJson = await response.json().then(r => {
            //console.log(`Response1: ${r}`)
            if (
              r[0] !== undefined &&
              (r[0].NOMBRE === nombre || r[0].CORREO === nombre)
            ) {
           //   cookie.save("nombre", nombre, { path: "/" });
              // cookie.save("nombre", nombre, { path: "/entrar" });
           //   cookie.save("pass", pass, { path: "/" });
              // cookie.save("pass", pass, { path: "/entrar" });
           //   this.props.history.push("/inicio");
              /*confirmAlert({
    title: "Comprobación con éxito",
    message: "El usuario se ha comprobado con éxito.",
    buttons: [
      {
        label: "Aceptar",
        onClick: () => {
          this.props.history.push("/inicio");
        }
      }
    ]
  });*/
            } else if (r.error.name === "error01") {
              this.removeCookie()
              confirmAlert({
                title: "¡Error!",
                message: "La contraseña es incorrecta.",
                buttons: [
                  {
                    label: "Aceptar",
                    onClick: () => {
                        this.props.history.push("/entrar");
                    }
                  }
                ]
              });
            } else if (r.error.name === "error02") {
              this.removeCookie();
              confirmAlert({
                title: "¡Error!",
                message: "El correo NO éxiste.",
                buttons: [
                  {
                    label: "Aceptar",
                    onClick: () => {
                        this.props.history.push("/entrar");
                    }
                  },
                  {
                    label: "Registrarse",
                    onClick: () => {
                      this.props.history.push("/registro");
                    }
                  }
                ]
              });
            }
          });
        } catch (e) {
          console.log(`Error: ${e}`);
        }
  };

  salir = async () => {
    try {
      this.removeCookie();
      this.props.history.push("/entrar")
    } catch (e) {
        console.log(`Error: ${e}`)
    }
  };

  render(){
    const { nombre } = this.state;
    const { pass } = this.state;
            return (
              <>
                <Helmet>
                  <title>Bienvenido al sistema</title>
                  <meta name="description" content="Helmet application" />
                </Helmet>
                <div className="App">
                  <header className="App-header">
                    <h1> BIENVENIDO AL SISTEMA </h1>
                    <h3> NOMBRE: {nombre} </h3>
                    <div
                      style={{
                        borderWidth: 1,
                        borderStyle: "solid",
                        padding: 15,
                        borderRadius: 5
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
                        <button className="btn btn-danger" onClick={this.salir}>
                          SALIR
                        </button>
                      </div>
                    </div>
                  </header>
                </div>
              </>
            );
  }
}

