const greetingTarget = document.querySelector('.greeting-target')
const cardsTarget = document.querySelector('.cards')
const templateCard = document.querySelector('.template-card')
const create = document.querySelector('.create')

function actualizeTogglers(){
    let cards = document.querySelectorAll('.card')
    cards.forEach(card => {
        let toggler = card.querySelector('.toggler')
        let options = card.querySelector('.options')
        toggler.addEventListener('click', (e)=>{
            options.classList.toggle('hidden')
        },true)
        let eliminate = options.querySelector('.eliminate')
        let edit = options.querySelector('.edit')
        eliminate.addEventListener('click', (e)=>{
            if(confirm('¿Está seguro de que desea eliminar esta rutina?')){
                let itemToRemove = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.title').innerHTML
                console.log(itemToRemove)
                removeRoutine(itemToRemove)
            }
        })
        edit.addEventListener('click', (e)=>{
            let usuario = getQueryVariable('usuario')
            let rutina = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.title').innerHTML
            window.location.assign(`../rutinas/rutinas.html?usuario=${usuario}&rutina=${rutina}&create=false`)
        })
    })
}

function hideTogglers(){
    let cards = document.querySelectorAll('.card')
    cards.forEach(card=>{
        let options = card.querySelector('.options')
        options.classList.add('hidden')
    })
}

function clickedOutside(element, event){
    if(!element.contains(event.target)){
        hideTogglers()
        return
    }
    else {
        return
    }
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

function setGreating(){
    let user = getQueryVariable("usuario")
    let date = new Date()
    let time = date.getHours()
    if(time<3){
        greetingTarget.innerHTML = `Buenas noches,  ${user}`
    } else if(time<12){
        greetingTarget.innerHTML = `Buenos dias,  ${user}`
    } else if(time<19){
        greetingTarget.innerHTML = `Buenas tardes,  ${user}`
    } else {
        greetingTarget.innerHTML = `Buenas noches,  ${user}`
    }
}

function createCard(name, duration){
    let clone = templateCard.content.cloneNode(true)
    let nameTarget = clone.querySelector('.title')
    let durationTarget = clone.querySelector('.duration')
    let nameTxt = document.createTextNode(name)
    let durationTxt = document.createTextNode(duration)
    nameTarget.innerHTML = ''
    durationTarget.innerHTML = ''
    nameTarget.appendChild(nameTxt)
    durationTarget.appendChild(durationTxt)
    cardsTarget.appendChild(clone)
}

function getDuration(array){
    return array.reduce((sumatoria, elemento)=>{
        return parseFloat(elemento.duracion) + sumatoria
    }, 0)
}

function removeRoutine(toRemove){
    fetch(`https://daw-api.herokuapp.com/users?usuario=${getQueryVariable("usuario")}`)
        .then(res=>res.json())
        .then(res=>{
            let currentRoutines = res[0].rutinas
            let routineIndex = undefined
            for(let i = 0; i <= currentRoutines.length - 1; i++){
                if(currentRoutines[i].nombreRutina == toRemove){
                    routineIndex = i
                } else {
                    continue
                }
            }
            if(routineIndex===undefined){
                alert("La rutina por eliminar no es correcta")
            } else {
                let newRoutines = currentRoutines.pop(currentRoutines[routineIndex])
                let newData = res[0]
                newData.rutinas = [newRoutines]
                fetch(`https://daw-api.herokuapp.com/users/${res[0].id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(newData)
                }).then(actualizeCards())
                .catch(error=>console.log(error))
            }
        })
}

function actualizeCards(){
    cardsTarget.innerHTML = ''
    fetch(`https://daw-api.herokuapp.com/users?usuario=${getQueryVariable("usuario")}`)
        .then(res=>res.json())
        .then(res=>{
            res[0].rutinas.forEach(rutina=>{
                createCard(rutina.nombreRutina, getDuration(rutina.contenido) + 'min')
            })
            actualizeTogglers()
            actualizeStart()
        })
}


function actualizeStart(){
    let cards = document.querySelectorAll('.card')
    cards.forEach(card=>{
        let start = card.querySelector('.start')
        start.addEventListener('click', (e)=>{
            let usuario = getQueryVariable('usuario')
            let rutina = e.target.parentNode.parentNode.parentNode.parentNode.querySelector('.title').innerHTML
            window.location.assign(`../rutinas/rutinas.html?usuario=${usuario}&rutina=${rutina}&create=false`)
        })
    })
}


window.addEventListener('load', (e)=>{
    actualizeTogglers()
    setGreating()
    actualizeCards()
})

document.addEventListener('mouseup', (e)=>{
    let cards = document.querySelectorAll('.card')
    cards.forEach(card => {
        let options = card.querySelector('.options')
        clickedOutside(options, e)
    })
})

create.addEventListener('click', (e)=>{
    let usuario = getQueryVariable('usuario')
    window.location.assign(`../rutinas/rutinas.html?usuario=${usuario}&create=${true}`)
})