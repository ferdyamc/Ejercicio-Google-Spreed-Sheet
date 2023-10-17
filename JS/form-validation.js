        // Funcion anónima para evitar el envio de formularios en caso de tener campos sin validar
        (() => {
            'use strict'

            // Captura en un arreglo (Constante) todos los formularios con la clase "needs-validation"
            const mensaje = document.getElementById("Mensaje-resultado")
            const scriptURL = 'https://script.google.com/macros/s/AKfycbwp00OTL92OWEwShj-UPJsVivN49gVEcUuMwkCmRCa-x_6Pe2b7ETOJb_SlM2KS-Zsdjw/exec'           
            const forms = document.querySelectorAll('.needs-validation')

            // Recorre el arreglo y asigna a cada formulario un evento de submit (el evento detiene el submit en caso de que los campos no esten completamente validados).
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    event.preventDefault()

                    if (!form.checkValidity()) {
                        event.stopPropagation()
                    }else{     
                        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                        .then(response => {
                            mensaje.innerHTML="Datos enviados correctamente!"
                            setTimeout(function(){
                                mensaje.innerHTML = ""
                            },3000)
                        })
                        .catch(error => {
                            mensaje.innerHTML = "Oopss! Error al enviar los datos."
                             setTimeout(function(){
                            mensaje.innerHTML = ""
                        },3000)
                        })                       
                    }

                    form.classList.add('was-validated')
                    
                }, false)
            })
        })()