const editButton = document.querySelector('.edit')
const routineName = document.querySelector('.name')
const routineNameInput = document.querySelector('.i-name')
const routineDuration = document.querySelector('.duration')
const addButton = document.querySelector('.add')
const trashButton = document.querySelector('.trash')
const newExerciseFormTemplate = document.querySelector('.t-createNewForm')
const list = document.querySelector('.list')
const listElementTemplate = document.querySelector('.t-listelement')
let editing = false
let creatingNew = false

function addDragNDropFunctionality(exe){
    exe.setAttribute('draggable', 'true')
    exe.addEventListener('dragstart', (e)=>{
        addButton.classList.add('hidden')
        trashButton.classList.remove('hidden')
        exe.classList.add('dragging')
    })

    exe.addEventListener('dragend', (e)=>{
        addButton.classList.remove('hidden')
        trashButton.classList.add('hidden')
        exe.classList.remove('dragging')
    })

    list.addEventListener('dragover', (e)=>{
        e.preventDefault()
        let afterElement = getDragAfterElement(list, e.clientY)
        let draggable = document.querySelector('.dragging')
        if(afterElement==null){
            list.appendChild(draggable)
        } else {
            list.insertBefore(draggable, afterElement)
        }
    })
}

function removeDragNDropFunctionality(exe){
    exe.setAttribute('draggable', 'false')
    exe.removeEventListener('dragstart', (e)=>{
        exe.classList.add('dragging')
    })

    exe.removeEventListener('dragend', (e)=>{
        exe.classList.remove('dragging')
    })

    list.removeEventListener('dragover', (e)=>{
        e.preventDefault()
        let afterElement = getDragAfterElement(list, e.clientY)
        let draggable = document.querySelector('.dragging')
        if(afterElement==null){
            list.appendChild(draggable)
        } else {
            list.insertBefore(draggable, afterElement)
        }
    })
}

function getDragAfterElement(container, y){
    let draggableElements = [...container.querySelectorAll('.list-element:not(.dragging)')]

    return draggableElements.reduce((closest, child)=>{
        let box = child.getBoundingClientRect()
        let offset = y - box.top - box.height / 2
        if(offset < 0 && offset > closest.offset){
            return { offset : offset, element : child }
        }else{
            return closest
        }
    }, { offset : Number.NEGATIVE_INFINITY }).element
}

function enterEditingMode(){
    editButton.setAttribute('src', '../src/icons/edit_green.png')

    routineName.classList.add('hidden')
    routineNameInput.classList.remove('hidden')
    routineNameInput.value = routineName.innerHTML
    addButton.classList.remove('hidden')
    
    let exercises = document.querySelectorAll('.list-element:not(.new)')

    exercises.forEach(exe =>{
        let play = exe.querySelector('.play')
        play.classList.add('hidden')

        addDragNDropFunctionality(exe)
    })
}

function exitEditingMode(){
    editButton.setAttribute('src', '../src/icons/edit_gray.png')

    routineName.classList.remove('hidden')
    routineNameInput.classList.add('hidden')
    routineName.innerHTML = routineNameInput.value
    addButton.classList.add('hidden')

    let exercises = document.querySelectorAll('.list-element:not(.new)')

    exercises.forEach(exe =>{
        let play = exe.querySelector('.play')
        play.classList.add('hidden')

        removeDragNDropFunctionality(exe)
    })
}

function createForm(){
    let form = newExerciseFormTemplate.content.cloneNode(true)
    let newName = form.querySelector('.new-name')
    let newDuration = form.querySelector('.new-duration')
    let newReference = form.querySelector('.new-reference')
    let doneButton = form.querySelector('.done')
    let cancelButton = form.querySelector('.cancel')
    
    doneButton.addEventListener('click', (e)=>{
        if(newName.value == ''){
            newName.focus()
            return
        }
        else if(newDuration.value == ''){
            newDuration.focus()
            return
        }else {
            creatingNew = !creatingNew
            list.querySelector('.new').remove()
            createNewListElement(newName.value, newDuration.value)
        }
    })

    cancelButton.addEventListener('click', (e)=>{
        creatingNew = !creatingNew
        list.querySelector('.new').remove()
    })

    list.appendChild(form)
}

function createNewListElement(name, duration){
    let listElement = listElementTemplate.content.cloneNode(true)
    let elementName = listElement.querySelector('.e-name')
    let elementDuration = listElement.querySelector('.e-duration')
    elementName.innerHTML = String(name)
    elementDuration.innerHTML = String(duration)
    addDragNDropFunctionality(listElement.querySelector('.list-element'))
    list.appendChild(listElement)
}


editButton.addEventListener('click', (e)=>{
    if(editing){
        exitEditingMode()
    }else{
        enterEditingMode()
    }
    editing = !editing
})

addButton.addEventListener('click', (e)=>{
    if(creatingNew){
        creatingNew = !creatingNew
        list.querySelector('.new').remove()
    } else {
        createForm()
        creatingNew = !creatingNew
    }
})

trashButton.addEventListener('dragover', (e)=>{
    e.preventDefault()
    trashButton.style.transform = 'scale(1.1)'
    let dragging = list.querySelector('.dragging')
})

trashButton.addEventListener('dragleave', (e)=>{
    e.preventDefault()
    trashButton.style.transform = 'scale(1)'
    let dragging = list.querySelector('.dragging')
})

trashButton.addEventListener('drop', (e)=>{
    list.removeChild(list.querySelector('.dragging'))
})