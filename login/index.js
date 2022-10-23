const usuarioInp = document.querySelector('.usuario')
const pwdInp = document.querySelector('.pwd')
const ingresar = document.querySelector('.ingresar')
const google = document.querySelector('.google')

ingresar.addEventListener('click', (e)=>{
    let uIn = usuarioInp.value
    let pwd = pwdInp.value
    if(uIn == ''){
        usuarioInp.focus()
        return
    }else if(pwd == ''){
        pwdInp.focus()
        return
    } else {
        fetch("https://daw-api.herokuapp.com/users")
            .then(res=>res.json)
            .then(usuarios=>{
                usuarios.forEach(element=>{
                    if(element.usuario == uIn){
                    }
                })
            })
    }

        
})