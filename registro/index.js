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
            let userData = new FormData()
            userData.append('usuario', uIn)
            userData.append('password', p1)


            
            fetch('https://daw-api.herokuapp.com/users', {
                method: 'POST',
                body: {"ejemplo": "ejemplo"}
            }).then(res=>res.json())
            .then(result=>{
                console.log('Success', result)
                // window.location.assign('../login/login.html')
            })
            .catch(result=>{
                alert('Error', result)
            })
        }
    }
    
})
