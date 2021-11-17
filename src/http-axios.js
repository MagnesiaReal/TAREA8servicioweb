import axios from 'axios'

export default axios.create({
  baseURL : "http://52.188.0.44:8080/Servicio/rest/ws",
  mode : 'no-cors',
    headers: {
	'Access-Control-Allow-Origin': '*',
        "Content-type": "application/json"
    }
})
