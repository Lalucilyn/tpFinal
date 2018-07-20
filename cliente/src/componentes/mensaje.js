import React, { Component } from 'react';
class Mensaje extends Component {

  constructor(){
    super();
    this.state = {
    }
  }

  render() {
    return (
        <div className="mensaje">
            <img src="/images/errorLogo.png" alt="logo"/>
            <h1>404 - Página no encontrada</h1>
        </div>
      )
  }
}

export default Mensaje;