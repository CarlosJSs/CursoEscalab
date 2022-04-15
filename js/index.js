/* Carlos Eduardo López Gutiérrez
    Instagram: carlos.json
    GitHub: CarlosJSs 
    Curso Fundamentals JavaScript | Escalab */

/*Obtenemos los elementos que usaremos a lo largo del codigo por medio de JavaScript*/
const formulario = document.querySelector('#formulario-contacto');
const botonEnviar = document.querySelector('.btn-enviar');

const nameContact = document.getElementsByName('name_contact')[0];
const email = document.getElementsByName('email_contact')[0];
const phone = document.getElementsByName('tel_contact')[0];
const topic = document.getElementById('topic_contact');
const commit = document.getElementsByName('commit_contact')[0];

const errorsList = document.getElementById('errors');

/*              Funciones               */
function showError(element, message){
    element.classList.toggle('error');
    alert(message);
    errorsList.innerHTML += `<li>${message}</li>`;
}
function cleanErrors(){
    errorsList.innerHTML = '';
}
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

/*                  Eventos                   */
botonEnviar.addEventListener('click', (event) => {
    event.preventDefault();
    cleanErrors();
    let hasErrors = false;

    /*                Validaciones de los campos              */
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

    /*              Enviar el Email si todo esta correcto               */
    if(!hasErrors){
        sendMail(sanitizedName, email.value, sanitizedPhone, topic.value, sanitizedCommit);
    }
    
});

/* Desafío opcional: qué elemento y evento podríamos usar para detectar si el usuario 
     apreta Enter en vez de hacer click?
     Como elemento usaremos el form del HTML y el evento sera keypress
formulario.addEventListener('keypress', (event) => {
    if(event.keyCode===13){//si la tecla presioanda es ENTER mandaremos una alerta
        alert('Usted está enviando el formulario por medio de la tecla ENTER.')
    }
});

Mi desafio quedo a medias ya que funciona parcialmente, si el usuario da enter en el 
    textarea del comentario sale la alerta pero despues no envia el formulario, solo 
    da un salto en el texto
*/