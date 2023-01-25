//apis

/* 
PETICIONES
get -> traer o obtener
---para las apis no esta permitidas---
post -> enviar y guardar
put -> modificar
delete -> borrar */

// url base y luego endpoint

//asincronismo(async y away), el fetch va al servidor y vuelve con la informacion, por lo tanto lo ubica a lo ultimo por lo que tarda en completarse la peticion

/* const queryId=(id)=>document.getElementById(id) */ //me trae en la variable queryId a todos los id del html y luego para llamarlo escribo queryId(contenedor)

const URLbase='https://rickandmortyapi.com/api/'
let endPointPersonajes='character'

const contenedor=document.getElementById('contenedor')
const btnAnterior=document.getElementById('btnAnterior')
const btnSiguiente=document.getElementById('btnSiguiente')
let linkSig=''
let linkAnt=''

let buscar=document.getElementById('buscar')
let nombre=document.getElementById('nombre')

//guardamos el fetch en una funcion para que no se ejecute cada vez que inicia la pagina
const getPersonajes = (pagina) => {
    console.log(pagina)
    fetch(pagina)
    .then(response=>response.json()) //lo traemos a json
    .then(data=>mostrarPersonajes(data))
    .catch(error=>console.log(error)) //chequea errores que provienen de la api
    .finally(()=>console.log('finalizo la conexion a la api')) //da por finalizado el consumo de la api
}

getPersonajes(URLbase+endPointPersonajes)

const mostrarPersonajes = (data) => {
    let personajes = data.results
    contenedor.innerHTML=''
    for(let personaje of personajes){        
        contenedor.innerHTML+=`
        <div class="card m-3" style="width: 18rem;">
        <div class="card" style="width: 18rem;">
        <img src="${personaje.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${personaje.name}</h5>
          <p class="card-text">${personaje.status}</p>
          <p class="card-text">${personaje.gender}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      </div>`
    }
    linkSig = data.info.next
    linkAnt = data.info.prev
}

btnSiguiente.addEventListener('click', () =>{
  getPersonajes(linkSig)  
})

btnAnterior.addEventListener('click', () =>{
  getPersonajes(linkAnt)
})

buscar.addEventListener('click', () =>{
  getPersonajes(`${URLbase}character?name=${nombre.value}`)
})