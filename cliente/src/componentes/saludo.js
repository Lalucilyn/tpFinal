import React, { Component } from 'react';
class Saludo extends Component {

  constructor(){
    super();
    this.state = {
    }
  }

  render() {
    return (
        <div className="mensaje">
            <img src="/images/logo.png" alt="logo"/>
            <h1>¡Bienvenidx a mi proyecto final de ADA ITW!</h1> 
            <h5>Para testearlo, escribí el producto que quieras buscar en el input</h5>
        </div>    
      )
  }
}

export default Saludo;