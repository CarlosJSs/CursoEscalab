//----------------------Seleccionar y manipular elementos en el DOM----------------------
const formulario = document.querySelector('#formulario-contacto');

//const botonLimpiar = document.createElement('button');
//const textoBotonLimpiar = document.createTextNode('Limpiar formulario');
//botonLimpiar.appendChild(textoBotonLimpiar);

const botonEnviar = document.querySelector('.btn-enviar');

//-----------Obtenemos todos los elementos que necesitaremos del HTML, usando JS------------
const nameContact = document.getElementsByName('name_contact')[0];
const email = document.getElementsByName('email_contact')[0];
const phone = document.getElementsByName('tel_contact')[0];
const topic = document.getElementById('topic_contact');
const commit = document.getElementsByName('commit_contact')[0];
const errorsList = document.getElementById('errors');

//------------Funcion mostrar error, agregamos la clase error a el elemento, mostramos una alerta,
//            y agregamos el li con el error en la lista inyectando codigo HTML
function showError(element, message){
    element.classList.toggle('error');
    alert(message);
    errorsList.innerHTML += `<li>${message}</li>`;
}

//------------Limpiamos nuestra lu de errores------------
function cleanErrors(){
    errorsList.innerHTML = '';
}

//---------Funcion para enviar el email si las validacion son correctas-------------------
//---------Definimos una funcion asincrona con parametros que pasaremos al formato del JSON
//---------Usamos fecth con await pasandole el link de la API y su configuracion (metodo, headers)
//---------Como estamos usando el metodo post, definimos tambien el cuerpo de lo que enviaremos a la API
//---------indicamos que es JSON y con stringify pasamos los parametros del cuerpo
//---------Despues guardamos la respuesta de la API en content pero antes lo parseamos como json
//---------recordemos que es otro proceso asincrono (usaremos await)
//---------Al final obtenemos el arreglo errors del objeto content por medio de Object.keys()
async function sendMail(name, email, phone, select, comment) {
    const rawResponse = await fetch('https://30kd6edtfc.execute-api.us-east-1.amazonaws.com/prod/send-email', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, phone, select, comment })
    });
    const content = await rawResponse.json();
    if(Object.keys(content.errors).length > 0){
        alert('Error al enviar el correo');
    }else{
        alert('Correo enviado exitosamente');
    }
}

//botonEnviar.insertAdjacentElement('afterend' ,botonLimpiar);

//botonLimpiar.className = 'btns btn-enviar btn-limpiar';
//document.querySelector('.btn-limpiar').style.backgroundColor = '#ff0000';

//botonLimpiar.addEventListener('click', (event) => {
    //event.preventDefault();
    //alert('Estas seguro de que deseas borrar el forulario?');
//});

//-------------Agregamos el evento al boton enviar
botonEnviar.addEventListener('click', (event) => {
    event.preventDefault();
    cleanErrors();
    let hasErrors = false;

    //-----------Validaciones del formulario con funciones string y expresiones regulares----------
    const sanitizedName = nameContact.value.trim();
    if(sanitizedName.length === 0 || sanitizedName.indexOf(' ') < 0){
        showError(nameContact, "El nombre y apellido no debe estar vacio y debe contener al menos un espacio.");
        hasErrors = true;
    }
    const mailRe = /^\w+@\w+\.\w{2,7}$/mg;
    if(!mailRe.exec(email.value)){
        showError(email, "El correo debe seguir un formato valido.");
        hasErrors = true;
    }
    const phoneRe = /^\+?\d{7,15}$/;
    const sanitizedPhone = phone.value.replace(' ', '');
    if(!phoneRe.exec(sanitizedPhone)){
        showError(phone, "El numero de telefono debe tener entre 7 y 15 digitos.");
        hasErrors = true;
    }
    const sanitizedCommit = commit.value.trim();
    if(sanitizedCommit.length < 20){
        showError(commit, "El mensaje debe ser al menos de 20 caracteres de largo.");
        hasErrors = true;
    }

    //--------------------Si todo sale bien enviamos el email-------------------
    if(!hasErrors){
        sendMail(sanitizedName, email.value, sanitizedPhone, topic.value, sanitizedCommit);
    }
    
});

//formulario.innerHTML += '<button class="btns btn-enviar btn-limpiar">Limpiar formulario</button>';
//document.querySelector('.btn-limpiar').style.backgroundColor = '#ff0000';
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