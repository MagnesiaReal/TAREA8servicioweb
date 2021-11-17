import React from 'react'

import WS from './WS-http'

import Articulo from './Articulo';

class Compra extends  React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      lista : [],
      effect : false,
      listaHtml : null,
      refs: [],
      busqueda : ""
    }
    this.onBuscar = this.onBuscar.bind(this);
    this.onEnter = this.onEnter.bind(this);
    console.log("on constructor");
  }
  
  onBuscar(e){
    e.preventDefault();
    this.setState({busqueda : e.target.value});
  }

  onEnter(e){
    if(e.key === 'Enter') {
      console.log(e.target.value);
      function datus() {
        return new Promise((resolve, reject)=>{
          WS('buscar',{
            busqueda : e.target.value
          }, function(code,result)
            {
              if (code === 200){
                console.log("datos recopilados con exito: ", result);
                resolve(result);
              }
              else{
                alert("ERROR BUSQUEDA: ", JSON.stringify(result));
                reject(result);
              }
                
            });
        });

      }

      datus().then(
        data => {

          this.setState({lista : data});
          console.log("LISTA BUSCADA: ", data);
          this.mapArticulos();
        }
      ).catch(error => console.log("Error de busqueda ", error));
    }

  }
  
  onComprar(articulo, cantidad){
    
    console.log("Agregando articulo:", articulo, " a carrito");

    WS('agregar_carrito',{ 
      compra : {
        id_articulo : articulo.id_articulo,
        cantidad : cantidad,
        cantidad_art : articulo.cantidad,
        costo : articulo.precio * cantidad
      }
    }, (code,result) => {
      if (code === 200){
        console.log("Articulo Agregado a Carrito", result);
      }
      else{
        console.log("Hubo un error");
        alert(JSON.stringify(result));
      }
    });
  }

  mapArticulos(){
    let articulos_html = this.state.lista.map((articulo, indice) => {
      return (<Articulo parametros={{articulo, indice}} onCompra={this.onComprar}/>);
      }
    );

    this.setState({listaHtml : articulos_html, effect : true});
  }

  componentDidMount () {
    console.log("componentDidMountCompra");
    function datus() {
      return new Promise((resolve, reject)=>{
        WS('consulta_global',{}, function(code,result)
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
        console.log("LIST: ", data);
        this.mapArticulos();
      }
    ).catch(error => console.log("Error", error));
  }

  render(){

    return (<>
      <div className="row busqueda sticky-top mt-1 mb-1 text-center">
        <div><input className="m-2" type="text" placeholder="Buscar articulo" value={this.state.busqueda} onChange={this.onBuscar} onKeyDown={this.onEnter}/></div>
      </div>
      <div className="row text-center">
        {this.state.effect ? this.state.listaHtml : <h1>Cargando articulos... si es que hay.</h1>}
      </div >
      </>);
  }

}

export default Compra;
