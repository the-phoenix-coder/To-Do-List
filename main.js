const input = document.querySelector('input')
const add = document.querySelector('.add')
const clear = document.querySelector('.clear')
const boxsContainer = document.querySelector('.boxsContainer')


let arr;


if(localStorage.getItem('tasks')) {
    arr = JSON.parse(localStorage.getItem('tasks'))
} else arr = []

fromLocal()

window.onload = () => {
    input.focus()
}

add.addEventListener('click', () => {
    if(input.value !== '') {
        addTask(input.value)
        input.value = ''
        input.focus()
    }
})

boxsContainer.addEventListener('click', e => {
    if(e.target.classList.contains('del')) {
        deleteWith(e.target.parentElement.getAttribute('data-id'))
        e.target.parentElement.remove()
    }
})

function addTask(txt) {
    let task = {
        id: Date.now(),
        name: txt
    }
    arr.push(task)
    toPage(arr)
    toLocal(arr)
}


function toPage(arr) {
    boxsContainer.innerHTML = ''
    
    arr.forEach(task => {
        let box = document.createElement('div')
        box.classList.add('box')
        box.setAttribute('data-id', task.id)
        box.append(document.createTextNode(task.name))

        let del = document.createElement('button')
        del.className = 'del btn'
        del.append(document.createTextNode('Delete'))

        box.append(del)
        boxsContainer.append(box)
    });

}

function toLocal(arr) {
    localStorage.setItem('tasks', JSON.stringify(arr))
}

function fromLocal() {
    let data = localStorage.getItem('tasks')
    if(data) {
        let tasks = JSON.parse(data)
        toPage(tasks)
    }
}

function deleteWith(taskId) {
    arr = arr.filter(task => task.id != taskId)
    toLocal(arr)
}

clear.addEventListener('click', () => {
    boxsContainer.innerHTML = ''
    localStorage.clear()
})