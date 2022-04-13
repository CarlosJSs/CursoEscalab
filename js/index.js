//----------------------Seleccionar y manipular elementos en el DOM----------------------
const formulario = document.querySelector('#formulario-contacto');

const botonLimpiar = document.createElement('button');
const textoBotonLimpiar = document.createTextNode('Limpiar formulario');
botonLimpiar.appendChild(textoBotonLimpiar);

const botonEnviar = document.querySelector('.btn-enviar');

botonEnviar.insertAdjacentElement('afterend' ,botonLimpiar);

botonLimpiar.className = 'btns btn-enviar btn-limpiar';

//formulario.innerHTML += '<button class="btns btn-enviar btn-limpiar">Limpiar formulario</button>';
document.querySelector('.btn-limpiar').style.backgroundColor = '#ff0000';
//formulario.removeChild(document.querySelector('.btn-limpiar'));

//formulario.parentNode.removeChild(formulario);

//conts enlaces = document.getElementsByTagName('a');

//Array.from(enlaces).forEach(element => {
    //element.parentNode.removeChild(element);
    //element.style.backgroundColor = '#000000';    
//});

//console.log(enlaces);

//const formulario = document.getElementById('formulario-contacto');
//formulario.style.fontFamily = 'serif';
//formulario.style.width = '50px';

//const botonVerServicios = document.querySelector('.btn-hero');
//botonVerServicios.className += ' btn-enviar';
//console.log(botonVerServicios.className);

//botonVerServicios.style.backgroundColor = '#000000';
//botonVerServicios.innerHTML = 'Cambió';