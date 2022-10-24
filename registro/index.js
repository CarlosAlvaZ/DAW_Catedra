const usuarioInput = document.querySelector('.usuario')
const password1 = document.querySelector('.pwd1')
const password2 = document.querySelector('.pwd2')
const enviar = document.querySelector('.registrar')

enviar.addEventListener('click', (e)=>{
    let uIn = usuarioInput.value
    let p1 = password1.value
    let p2 = password2.value
    if(uIn == ''){
        usuarioInput.focus()
        return
    } else if(p1 == ''){
        password1.focus()
        return
    } else if(p2 == ''){
        password2.focus()
        return
    } else {
        if(p1 !== p2) {
            alert('Las contraseñas no coinciden')
        } else {
            let userData = {   
                usuario: uIn,
                pwd: p1,
                registro: Date.now()
            }


            
            fetch('https://daw-api.herokuapp.com/users/')
                .then(res=>res.json())
                .then(data=>{
                    let currentId = data.length
                    let userData = {
                        id: currentId + 1,
                        usuario: uIn,
                        pwd: p1,
                        registro: Date.now(),
                        record: [],
                        rutinas: [],
                        imc: ""
                    }

                    fetch('https://daw-api.herokuapp.com/users/', {
                        method: 'POST',
                        headers: {
                            "Content-type" : "application/json"
                        },
                        body: JSON.stringify(userData)
                    }).then(res=>{
                        console.log('Success', res)
                        window.location.assign("../login/login.html")
                    })
                    .catch(res=>console.log('Error', res))
                }).catch(res=>console.log('Error', res))
        }
    }
    
})
