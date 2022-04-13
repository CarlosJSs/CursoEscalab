//----------------------Seleccionar y manipular elementos que ya tenemos en el DOM----------------------
const enlaces = document.querySelectorAll('a');

//conts enlaces = document.getElementsByTagName('a');

Array.from(enlaces).forEach(element => {
    element.style.backgroundColor = '#000000';    
});

//console.log(enlaces);

//const formulario = document.getElementById('formulario-contacto');
//formulario.style.fontFamily = 'serif';
//formulario.style.width = '50px';

//const botonVerServicios = document.querySelector('.btn-hero');
//botonVerServicios.className += ' btn-enviar';
//console.log(botonVerServicios.className);

//botonVerServicios.style.backgroundColor = '#000000';
//botonVerServicios.innerHTML = 'Cambió';