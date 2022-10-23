function actualizeTogglers(){
    let cards = document.querySelectorAll('.card')
    cards.forEach(card => {
        let toggler = card.querySelector('.toggler')
        let options = card.querySelector('.options')
        toggler.addEventListener('click', (e)=>{
            options.classList.toggle('hidden')
        },true)
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

window.addEventListener('load', (e)=>{
    actualizeTogglers()
})

document.addEventListener('mouseup', (e)=>{
    let cards = document.querySelectorAll('.card')
    cards.forEach(card => {
        let options = card.querySelector('.options')
        clickedOutside(options, e)
    })
})