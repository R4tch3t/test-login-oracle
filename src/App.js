import React from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
//<img src={logo} className="App-logo" alt="logo" />

function App() {
  return (
    <div className="App">   
      <header className="App-header">     
        <h1> REGISTRO DE USUARIOS </h1>

      <div style={{ borderWidth: 1, 
        borderStyle: 'solid', 
        padding: 15,
        borderRadius: 5  }} >  
        
        <div>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ textAlign: 'left' }} >
                  Correo:
                </td>
                <td> 
                  <input type='text' />
                </td>  
              </tr>
              <tr>  
                <td style={{ textAlign: 'left' }} >  
                  Contraseña:
                </td>
                <td> 
                  <input type='password' />
                </td>   
              </tr>  
            </tbody>  
          </table>
        </div>
        
        <br/>
        <div style={{  }} >
          <button className="btn btn-facebook" style={{ position: 'relative', width: 235, height: 45}}  >
              <div style={{ display: 'felx', 
                backgroundColor: 'white', 
                color: '#4267b2',
                width: 30,
                height: 30,
                borderRadius: 3
                 }}  >
                <span style={{  position: 'relative', bottom: "5px", left: 3, fontWeight: 'bold', fontSize: 30 }} >f</span>
              </div>
              <div style={{ position: 'relative', left: 20, top: "-27px" }} >
                ENTRAR CON FACEBOOK 
              </div>  
          </button>
        </div> 
        <br/>
        
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: 'center' }} >  
          <div style={{ display: "flex", flex: 1, alignItems: 'flex-start', justifyContent: "flex-end" }} >
            <button className="btn btn-success"  >ENTRAR</button>
          </div>  
          <div style={{ display: "flex", flex: 1, alignItems: 'flex-start', justifyContent: "flex-end" }} >
            <button className="btn btn-primary" >REGISTRO</button>
          </div>
        </div>

      </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
