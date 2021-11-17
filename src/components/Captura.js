import React from 'react'

import NavDropdown from 'react-bootstrap/NavDropdown'

import usuario from '../images/usuario_sin_foto.png'
import WS from './WS-http'


class Captura extends React.Component{
  constructor(props){
    super(props);
    this.onDescripcion = this.onDescripcion.bind(this);
    this.onPrecio = this.onPrecio.bind(this);
    this.onCantidad = this.onCantidad.bind(this);
    this.onFoto = this.onFoto.bind(this);

    this.onFile = this.onFile.bind(this);
    this.onReadFile = this.onReadFile.bind(this);

    this.crearArticulo = this.crearArticulo.bind(this);
    
    this.fileRef = React.createRef(null);

    this.state = {
      descripcion : "",
      precio : 0,
      cantidad : 0,
      foto: usuario,
      res: ''
    }
    console.log("Imagen inicial: " + usuario);
    
  }


  onDescripcion(e){
    this.setState({descripcion: e.target.value})
  }

  onPrecio(e){
    this.setState({precio: e.target.value})
  }

  onCantidad(e){
    this.setState({cantidad: e.target.value});
  }

  onFoto(e){
    this.setState({foto: e.target.value});
  }

  onFile(e){
    e.preventDefault();
    this.fileRef.current.click();
  }
  
  onReadFile(e) {
    console.log("something: "+ e.target.files[0]);
    
    function getBase64(file) {
      return new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => resolve(reader.result);
	reader.onerror = error => reject(error);
      });
    }

    getBase64(e.target.files[0]).then(
      data => {
	this.setState({foto : data});
	console.log("Image code: " + data);
      }
    )   
  }
  
  crearArticulo(e){
    e.preventDefault();
    console.log(this.state.descripcion + this.state.precio + this.state.cantidad + this.state.foto.split(',')[1]);
    console.log("FOTO: " + this.state.foto);
    WS('captura_articulo',{
      articulo: {
      descripcion : this.state.descripcion,
      precio : this.state.precio,
      cantidad : this.state.cantidad,
      foto : this.state.foto.split(',')[1]
    }
    }, function(code,result)
    {
      if (code === 200) {
	alert("Articulo guardado con exito");
      }
      else
	alert(JSON.stringify(result));
    });
    this.setState({descripcion : "", precio : 0, cantidad : 0, foto: usuario});
  }

  render(){


    return (<div>
	  <div className="row text-center"> 
	    <label>
	      Descripcion: 
	    </label>
	    <div>
	      <textarea name="descripcion" value={this.state.descripcion} onChange={this.onDescripcion} style={{height : 100, maxWidth : 800}}>Descripcion alv</textarea>
	    </div>
	    <div className="m-1">
	      <label>
		Precio: 
	      </label><br/>
	      $<input type="number" name="precio" value={this.state.precio} onChange={this.onPrecio}/>
	    </div>
	    <div className="m-1">
	      <label>
		Cantidad:	
	      </label><br/>
	      <input type="number" name="cantidad" value={this.state.cantidad} onChange={this.onCantidad}/>
	    </div> 
	    <div className="m-1">
	      <label>Foto:</label><br/>
	      <img style={{width : 100}} src={this.state.foto} alt={"user"}/><br/>
	      <input type="button" className="btn btn-primary" value="Subir Foto" onClick={this.onFile}/><br/>
	      <input type="file" ref={this.fileRef} multiple={false} accept="image/*" style={{visibility : "hidden"}} onChange={this.onReadFile}/>
	    </div>
	    <NavDropdown.Divider/>
	    <div className="m-1">
	      <button value="Crear" className="btn btn-dark" onClick={this.crearArticulo} style={{margin : "10px"}}>Crear</button>
	    </div>
	  </div>
      <div>{this.state.precio}</div>
      </div>);
  }

}


export default Captura;
