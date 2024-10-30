
import { insertarClientes, obtenerClientes, actualizarClientes, eliminarClientes } from "../modelos/clientes";
const btnNuevo = document.querySelector('#btnNuevo');
const formularioModal = new bootstrap.Modal(document.getElementById('formularioModal'));
const formulario = document.querySelector('#formulario');
// Alerta
const alerta = document.querySelector('#alerta');

// Inputs
const inputTipo = document.querySelector("#tipo");
const inputDni = document.querySelector("#dni");
const inputApellidoRSocial = document.querySelector("#apellidoRsocial");
const inputNombre = document.querySelector("#nombre");
const inputDomicilio = document.querySelector("#domicilio");
const inputTelefono = document.querySelector("#telefono");
const inputEmail = document.querySelector("#email");
const inputLocalidad = document.querySelector("#localidad");
const inputCpostal = document.querySelector("#cpostal");
const inputFnacimiento = document.querySelector("#fnacimiento");
const inputFalta = document.querySelector("#falta");
const inputFbaja = document.querySelector("#fbaja");
const inputImagen = document.querySelector("#imagen");

// Imagen del formulario
const frmImagen = document.querySelector("#frmimagen");

// Variables
let opcion = '';
let id;
let codigo;
let mensajeAlerta;

// Evento que sucede cuando todo el contenido del DOM es leído
document.addEventListener('DOMContentLoaded', () => {
  mostrarClientes();
});

/**
 * Ejecuta el evento click del Botón Nuevo
 */
btnNuevo.addEventListener('click', () => {
  // Limpiamos los inputs
  inputTipo.value = null;
  inputDni.value = null;
  inputApellidoRSocial.value = null;
  inputNombre.value = null;
  inputDomicilio.value = null;
  inputTelefono.value = null;
  inputEmail.value = null;
  inputLocalidad.value = null;
  inputCpostal.value = null;
  inputFnacimiento.value = null;
  inputFalta.value = null;
  inputFbaja.value = null;
  inputImagen.value = null;
  frmImagen.src = './imagen/imagenNodisponible.jpg';


  // Mostramos el formulario
  formularioModal.show();

  opcion = 'insertar';
});


async function mostrarClientes() {
  const clientes = await obtenerClientes();
  const listado = document.getElementById('listado');
  listado.innerHTML = '';

  for (let cliente of clientes) {
    console.log(cliente);
    listado.innerHTML += `
    <div class="col  py-3">
      <div class="card" style="width: 18rem;">
        <img src="imagen/${cliente.imagen}" class="card-img-top" alt="${cliente.nombre}">
        <div class="card-body">
            <h5 class="card-title"><span name="spancodigo">${cliente.id}</span> - <span name="spanapellidoRsocial">${cliente.apellidoRsocial}</span></h5>
            
            <p class="card-text">Tipo:  <span name="spantipo">${cliente.tipo}</span></p>
            <p class="card-text">Dni:  <span name="spandni">${cliente.dni}</span></p>
            <p class="card-text">Email:  <span name="spanemail">${cliente.email}</span></p>
            <p class="card-text"> Nombre: <span name="spannombre">${cliente.nombre}</span></p>
            <p class="card-text"> Apellido/R social :  <span name="spanapellidoRsocial">${cliente.apellidoRsocial}</span></p>
            <p class="card-text"> Domicilio: <span name="spandomicilio">${cliente.domicilio}</span></p>
            <p class="card-text">Codigo Postal: <span name="spancpostal">${cliente.cpostal}</span></p>
            <p class="card-text">Telefono: <span name="spantelefono">${cliente.telefono}</span></p>
            <p class="card-text">Localidad:  <span name="spanlocalidad">${cliente.localidad}</span></p>
            <p class="card-text">Fecha nac:    <span name="spanfnacimiento">${cliente.fnacimiento}</span></p>
            <p class="card-text">Fecha alta:    <span name="spanalta">${cliente.falta}</span></p>
            <p class="card-text">Fecha baja:    <span name="spanbaja">${cliente.fbaja}</span></p>
        </div>
        <div class="card-footer d-flex justify-content-center">
          <a class="btnEditar btn btn-primary">Editar</a>
          <a class="btnBorrar btn btn-danger">Borrar</a>
          <input type="hidden" class="idCliente" value="${cliente.id}">
          <input type="hidden" class="imagenCliente" value="${cliente.imagen ?? 'imagenNodisponible.jpg'}">
        </div>
      </div>
    </div>
      `
  }
}

/**
 * Ejecuta el evento submit del formulario
 */
formulario.addEventListener('submit', function (e) {
 
  e.preventDefault();     // Prevenimos la acción por defecto
  const datos = new FormData(formulario); // Guardamos los datos del formulario

  switch (opcion) {
    case 'insertar':
      
      mensajeAlerta = `Datos guardados`;
      insertarClientes(datos);
      break;

    case 'actualizar':
      
      mensajeAlerta = `Datos actualizados`;
      actualizarClientes(datos, id);
      break;
  }
  insertarAlerta(mensajeAlerta, 'success');
  mostrarClientes();
})

/**
* Define el mensaje de alerta
* @param mensaje el mensaje a mostrar
* @param tipo el tipo de alerta
*/
const insertarAlerta = (mensaje, tipo) => {
  const envoltorio = document.createElement('div');
  envoltorio.innerHTML = `
  <div class="alert alert-${tipo} alert-dismissible" role="alert">
      <div>${mensaje}</div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
  </div>
  `;
  alerta.append(envoltorio);

  setTimeout(() => {
    envoltorio.remove();
  }, 3000);
};

/**
 * Determina en qué elemento se realiza un evento
 * @param elemento el elemento al que se realiza el evento
 * @param evento el evento realizado
 * @param selector el selector seleccionado
 * @param manejador el método que maneja el evento
 */
const on = (elemento, evento, selector, manejador) => {
  elemento.addEventListener(evento, e => { // Agregamos el método para escuchar el evento
    if (e.target.closest(selector)) { // Si el objetivo del manejador es el selector
      manejador(e); // Ejecutamos el método del manejador
    }
  })
}

/**
 * Función para el botón Editar
 */
on(document, 'click', '.btnEditar', e => {
  const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón

  // Guardamos los valores del card de la propiedad
  id = cardFooter.querySelector('.idCliente').value;
  const tipo = cardFooter.parentNode.querySelector('span[name=spantipo]').innerHTML;
  const dni = cardFooter.parentNode.querySelector('span[name=spandni]').innerHTML;
  const apellidoRsocial = cardFooter.parentNode.querySelector('span[name=spanapellidoRsocial]').innerHTML;
  const nombre = cardFooter.parentNode.querySelector('span[name=spannombre]').innerHTML;
  const domicilio = cardFooter.parentNode.querySelector('span[name=spandomicilio]').innerHTML;
  const telefono = cardFooter.parentNode.querySelector('span[name=spantelefono]').innerHTML;
  const email = cardFooter.parentNode.querySelector('span[name=spanemail]').innerHTML;
  const localidad = cardFooter.parentNode.querySelector('span[name=spanlocalidad]').innerHTML;
  const cpostal = cardFooter.parentNode.querySelector('span[name=spancpostal]').innerHTML;
  const fnacimiento = cardFooter.parentNode.querySelector('span[name=spanfnacimiento]').innerHTML;
  const falta = cardFooter.parentNode.querySelector('span[name=spanbaja]').innerHTML;
  const fbaja = cardFooter.parentNode.querySelector('span[name=spanalta]').innerHTML;
  const imagen = cardFooter.querySelector('.imagenCliente').innerHTML;

  // Asignamos los valores a los input del formulario
  inputTipo.value = tipo;
  inputDni.value = dni;
  inputApellidoRSocial.value = apellidoRsocial;
  inputNombre.value = nombre;
  inputDomicilio.value = domicilio;
  inputTelefono.value = telefono;
  inputEmail.value = email;
  inputLocalidad.value = localidad;
  inputCpostal.value = cpostal;
  inputFnacimiento.value = fnacimiento;
  inputFalta.value = falta;
  inputFbaja.value = fbaja;


  frmImagen.src = `./imagen/${imagen}`;

  // Mostramos el formulario
  formularioModal.show();

  opcion = 'actualizar';

});


/**
 *  Función para el botón Borrar
 */
on(document, 'click', '.btnBorrar', e => {
  const cardFooter = e.target.parentNode; // Guardamos el elemento padre del botón
  id = cardFooter.querySelector('.idCliente').value; // Obtenemos el id de la propiedad
  const nombre = cardFooter.parentNode.querySelector('span[name=spannombre]').innerHTML; // Obtenemos el nombre del artículo
  let aceptar = confirm(`¿Realmente desea eliminar a ${nombre}?`); // Pedimos confirmación para eliminar
  if (aceptar) {
    eliminarClientes(id);
    insertarAlerta(`${nombre}  borrado`, 'danger');
    mostrarClientes();
  }
});