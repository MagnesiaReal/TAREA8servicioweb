// Components 
import Options from './components/Options'
import Captura from './components/Captura'
import Compra from './components/Compra'
import Carrito from './components/Carrito'


import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';


// Css
import './App.css';
import './custom.css';


function App() {


  console.log("From app");

  return (
    <Router>
      <div className="container">
	<Options/>
	<Routes>
	  <Route path="/captura" element={<Captura/>}/>
	  <Route path="/compra" element={<Compra/>}/>
	  <Route path="/carrito" element={<Carrito/>}/>
	</Routes>  
      </div>
    </Router>
  ); 
}

export default App;

