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
                 constructor(props) {
                   super(props);
                   if (cookie.load("pass") !== undefined) {
                     /*this.comprobarU(
                       cookie.load("nombre"),
                       cookie.load("pass")
                     );*/
                     this.props.history.push("/inicio");
                   }
                   this.nombre = React.createRef();
                   this.pass = React.createRef();
                   
                 }
                 
                 saveCookies(nombre,pass){
                     cookie.save("nombre", nombre, { path: "/" });
                     cookie.save("pass", pass, { path: "/" });
                 }

                 entrar = () => {
                    this.comprobarU(
                      this.nombre.current.value,
                      this.pass.current.value
                    );
                 }

                 comprobarU = async (nombre,pass) => {
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
                        // cookie.save("nombre", nombre, { path: "/" });
                         // cookie.save("nombre", nombre, { path: "/entrar" });
                         //cookie.save("pass", pass, { path: "/" });
                         // cookie.save("pass", pass, { path: "/entrar" });
                         this.saveCookies(nombre,pass)
                         this.props.history.push("/inicio");
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
                         confirmAlert({
                           title: "¡Error!",
                           message: "La contraseña es incorrecta.",
                           buttons: [
                             {
                               label: "Aceptar",
                               onClick: () => {
                                 //  this.props.history.push("/entrar");
                               }
                             }
                           ]
                         });
                       } else if (r.error.name === "error02") {
                         confirmAlert({
                           title: "¡Error!",
                           message: "El correo NO éxiste.",
                           buttons: [
                             {
                               label: "Aceptar",
                               onClick: () => {
                                 //  this.props.history.push("/entrar");
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

                 render() {
                   return (
                     <>
                       <Helmet>
                         <title>Acceso de usuarios</title>
                         <meta
                           name="description"
                           content="Helmet application"
                         />
                       </Helmet>
                       <div className="App">
                         <header className="App-header">
                           <h1> ACCESO A USUARIOS </h1>

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
                                     <td style={{ textAlign: "left" }}>
                                       Nombre ó correo:
                                     </td>
                                     <td>
                                       <input ref={this.nombre} type="text" />
                                     </td>
                                   </tr>
                                   <tr>
                                     <td style={{ textAlign: "left" }}>
                                       Contraseña:
                                     </td>
                                     <td>
                                       <input ref={this.pass} type="password" />
                                     </td>
                                   </tr>
                                 </tbody>
                               </table>
                             </div>

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
                                 <button
                                   className="btn btn-success"
                                   onClick={this.entrar}
                                 >
                                   ENTRAR
                                 </button>
                               </div>
                               <div
                                 style={{
                                   display: "flex",
                                   flex: 1,
                                   alignItems: "flex-start",
                                   justifyContent: "flex-end"
                                 }}
                               >
                                 <Link to="/registro" className="link">
                                   <button
                                     to="/registro"
                                     className="btn btn-primary"
                                   >
                                     REGISTRO
                                   </button>
                                 </Link>
                               </div>
                             </div>

                             <br />
                             <div style={{}}>
                               <button
                                 className="btn btn-facebook"
                                 style={{
                                   position: "relative",
                                   width: 235,
                                   height: 45
                                 }}
                               >
                                 <div
                                   style={{
                                     display: "felx",
                                     backgroundColor: "white",
                                     color: "#4267b2",
                                     width: 30,
                                     height: 30,
                                     borderRadius: 3
                                   }}
                                 >
                                   <span
                                     style={{
                                       position: "relative",
                                       bottom: "5px",
                                       left: 3,
                                       fontWeight: "bold",
                                       fontSize: 30
                                     }}
                                   >
                                     f
                                   </span>
                                 </div>
                                 <div
                                   style={{
                                     position: "relative",
                                     left: 20,
                                     top: "-27px"
                                   }}
                                 >
                                   ENTRAR CON FACEBOOK
                                 </div>
                               </button>
                             </div>
                           </div>
                         </header>
                       </div>
                     </>
                   );
                 }
               }

