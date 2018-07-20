import React, { Component } from 'react';
import Busqueda from './componentes/cajaBusqueda'
import Resultados from './componentes/resultados'
import Producto from './componentes/producto'
import Mensaje from './componentes/mensaje'
import Saludo from './componentes/saludo'
import './css/appStyle.css'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


const App = () => (
  <Router>
     <div>
      <Busqueda/>
      <Switch>
        <Route exact path="/" component={Saludo}/>
        <Route exact path="/items" component={Resultados}/>
        <Route exact path="/items/:id" component={Producto}/>
        <Route component={Mensaje}/>
      </Switch>
     </div>
  </Router>
)

export default App;
