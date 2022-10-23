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

window.addEventListener('load', ()=>{
    setDate()
})

button.addEventListener('click', (e)=>{
    if(!dataExists()){
        let alert = templateAlert.content.cloneNode(true)
        alerts.appendChild(alert)
    } else {
        console.log(getData())
    }
})