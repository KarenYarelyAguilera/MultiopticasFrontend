//Funcion para consumir una API POST
export const sendData = async (urlAPI, data) => {
    //De aqui
    const resp = await fetch(urlAPI, {
      //Realiza una peticion asincrona fetch para consumir una API segun su URL
      method: "post", //Se le indica el metodo a utilizar (sino se hace esto, el fetch toma el metodo "Get" por default)
      body: JSON.stringify(data), //Se le manda el data con el que se consumira el API
      headers: {
        //Se le especifica que enviara un json.
        "Content-Type": "application/json",
      },
    }); //A aqui!!!!
    //console.log(resp)
    const json = await resp.json(); //Retorna los datos de la API y los convierte a json para utilizarlos despues
    //console.log(json)
  
    return json;
    //SIEMPRE que se realiza una consulta a la bdd los metodos deben ser async
  };