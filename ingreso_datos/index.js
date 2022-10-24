const inputSex = document.querySelector('.inputSex')
const inputAge = document.querySelector('.inputAge')
const inputHeight = document.querySelector('.inputHeight')
const inputWheight = document.querySelector('.inputWheight')
const selectHeight = document.querySelector('.selectHeight')
const selectWheight = document.querySelector('.selectWheight')
const dateTarget = document.querySelector('.date-target')
const button = document.querySelector('.button')
const alerts = document.querySelector('.alerts')
const templateAlert = document.querySelector('.template-alert')

function dataExists(){
    if(inputAge.value == '')return false
    if(inputHeight.value == '')return false
    if(inputWheight.value == '')return false
    return true
}

function getData(){
    let wheight = 0
    let height = 0
    if(selectWheight.options[selectWheight.selectedIndex].value == 'lbs'){
        wheight = parseFloat(inputWheight.value) / 2.2046
    }else{
        wheight = parseFloat(inputWheight.value)
    }

    if(selectHeight.options[selectHeight.selectedIndex].value == 'in'){
        height = parseFloat(inputHeight.value) / 30.48
    }else{
        height = parseFloat(inputHeight.value)
    }

    return {
        "sexo": String(inputSex.value),
        "edad": String(parseInt(inputAge.value)),
        "peso": wheight,
        "altura": height,
        "fecha": Date.now()
    }
}

function setDate() {
    let elapsed = Date.now()
    let hoy = new Date(elapsed)
    let txt = document.createTextNode(hoy.toLocaleDateString())
    dateTarget.innerHTML = ''
    dateTarget.appendChild(txt)
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}

function calcIMC(wheight, height){
    return wheight / Math.pow(2,(height / 100))
}

function categorizeIMC(imc){
    if(imc<18.5){
        return "bajo"
    } else if(imc < 24.9){
        return "normal"
    } else {
        return "alto"
    }
}

window.addEventListener('load', ()=>{
    setDate()
})

button.addEventListener('click', (e)=>{
    if(!dataExists()){
        let alert = templateAlert.content.cloneNode(true)
        alerts.appendChild(alert)
    } else {
        fetch('https://daw-api.herokuapp.com/users')
            .then(res=>res.json())
            .then(res=>{
                let currentUser = getQueryVariable("usuario")
                let user = res.reduce((prev, current)=>{
                    if(current.usuario == String(currentUser)){
                        return current
                    } else {
                        return prev
                    }
                }, {})
                if(user != {}){
                    let inputData = getData()
                    let userData = user
                    userData.record.push(inputData)
                    userData.imc = categorizeIMC(calcIMC(inputData.peso, inputData.altura))
                    if(userData.rutinas.length == 0){
                        fetch(`https://daw-api.herokuapp.com/routines?nombre=${userData.imc}`)
                            .then(res=>res.json())
                            .then(res=>{
                                userData.rutinas = res[0].rutinas
                                console.log(userData)
                                fetch(`https://daw-api.herokuapp.com/users/${user.id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-type': 'application/json'
                                    },
                                    body: JSON.stringify(userData)
                                }).then(res=>res.json())
                                .then(res=>{
                                    console.log('Success')
                                    window.location.assign(`../inicio/inicio.html?usuario=${res.usuario}`)
                                }).catch(res=>{console.log('Error', res)})
                            }).catch(error=>console.log(error))
                    } else {
                        fetch(`https://daw-api.herokuapp.com/users/${user.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(userData)
                        }).then(res=>res.json())
                        .then(res=>{
                            console.log('Success')
                            window.location.assign(`../inicio/inicio.html?usuario=${res.usuario}`)
                        })
                        .catch(res=>{console.log('Error', res)})
                    }
                        
                } else {
                    console.log('El usuario es incorrecto')
                }
            }).catch(error=>console.log('Error', error))
    }
})