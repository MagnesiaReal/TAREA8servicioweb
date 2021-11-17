import React from "react";

import WS from './WS-http'

import Carticulo from './Carticulo';

export default class Carrito extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      lista : [],
      effect : false,
      listaHtml : []
    }   
  }
  
  mapArticulos(){
    let articulos_html = this.state.lista.map((compra, indice) => {
      return (<Carticulo parametros={{compra, indice}}/>);
      }
    );

    this.setState({listaHtml : articulos_html, effect : true});
  }

  componentDidMount () {
    console.log("componentDidMountCompra");
    function datus() {
      return new Promise((resolve, reject)=>{
        WS('consulta_carrito',{}, function(code,result)
          {
            if (code === 200){
              console.log("datos recopilados con exito: ", result);
              resolve(result);
            }
            else{
              alert(JSON.stringify(result));
              reject(result);
            }
              
          });
      });

    }
    datus().then(
      data => {

        this.setState({lista : data});
        console.log("LISTA CARRO : ", data);
        this.mapArticulos();
      }
    ).catch(error => console.log("Error", error));
  }

  render(){

    return(<>
      <div className="row text-center">
        {this.state.effect ? this.state.listaHtml : <h1>Cargando carrito... si es que hay.</h1>}
      </div >
      </>
      
    );
  }
}
