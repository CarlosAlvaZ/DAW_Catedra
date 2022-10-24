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
        function userExists(users, toFind){
            return users.reduce((prev, user)=>{
                if(user.usuario==toFind){
                    return { exists : true, id : user.id}
                } else {
                    return prev
                }
            }, { exists : false, id : 0})
        }
        fetch('https://daw-api.herokuapp.com/users')
            .then(res=>res.json())
            .then(res=>{
                let validation = userExists(res, String(uIn))
                if(validation.exists){
                    let userObject = res.reduce((prev,element) => {
                        if(element.id == (validation.id - 1)){
                            return element
                        } else {
                            return prev
                        }
                    }, {})
                    if(userObject.pwd == String(pwd)){
                        window.location.assign(`../ingreso_datos/ingreso.html?usuario=${uIn}`)
                    }else{
                        alert('La contraseña es incorrecta')
                    }
                } else {
                    alert("El usuario ingresado no existe")
                }
            })
    }

        
})

google.addEventListener('click', (e)=>{
    console.log('Esta funcionalidad no fue inplementada puesto que justo este año Google ha vuelto obsoleta la forma comun de hacer uso de su API oAuth2, y la documentación de la nueva forma hace uso predominantemente de react y angular, no presentando opciones para Vainilla JS, por lo que esta funcionalidad será presentada en la segunda entrega, cuando hayamos migrado esta aplicación hacia React.js')
})