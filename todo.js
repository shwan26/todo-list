let todoItems = []
const todoInput = document.querySelector('.todo-input')
const completedTodoDiv = document.querySelector('.completed-todo')
const uncompletedTodoDiv = document.querySelector('.uncompleted-todo')

window.onload = () => {
    let storageTodoItems = localStorage.getItem('todoItems')
    if(storageTodoItems !== null) {
        todoItems = JSON.parse(storageTodoItems)

    }
    render()
}

todoInput.onkeyup = ((e) => {
    let value = e.target.value.replace(/^\s+/, "")
    if (value && e.keyCode == 13) {
        addTodo(value)

        todoInput.value = ''
        todoInput.focus()
    }
})

function addTodo(text) {
    todoItems.push ({
        id: Date.now(),
        text, 
        completed: false
    })

    saveAndRender()
}

function removeTodo(id) {
    todoItems = todoItems.filter(todo  => todo.id !== Number(id))
    saveAndRender()
}

function markAsCompleted(id) {
    todoItems = todoItems.filter(todo => {
        if(todo.id === Number(id)) {
            todo.completed = true
        }

        return todo
    })

    saveAndRender()
}

function markAsUncompleted(id) {
    todoItems = todoItems.filter(todo => {
        if(todo.id === Number(id)) {
            todo.completed = false
        }

        return todo
    })
    saveAndRender()
}

function save() {
    localStorage.setItem('todoItems', JSON.stringify(todoItems))

}

function render() {
    let unCompletedTodo = todoItems.filter(item => !item.completed)
    let completedTodo = todoItems.filter(item => item.completed)

    completedTodoDiv.innerHTML = ''
    uncompletedTodoDiv.innerHTML = ''
    
    if(unCompletedTodo.length > 0) {
        unCompletedTodo.forEach(todo => {
            uncompletedTodoDiv.append(createTodoElement(todo))
        })
    }
    else {
        uncompletedTodoDiv.innerHTML = `<div class='empty'>No uncompleted tasks</div>`
    }

    if(completedTodo.length > 0) {
        completedTodoDiv.innerHTML = `<div class='completed-title'>Completed (${completedTodo.length} / ${todoItems.length})</div>`
        
        completedTodo.forEach(todo => {
            completedTodoDiv.append(createTodoElement(todo))
        })
    }
}

function saveAndRender() {
    save()
    render()
}

function createTodoElement(todo) {
    const todoDiv = document.createElement('div')
    todoDiv.setAttribute('data-id', todo.id)
    todoDiv.className = 'todo-item'

    const todoTextSpan = document.createElement('span')
    todoTextSpan.innerHTML = todo.text

    const todoInputCheckbox = document.createElement('input')
    todoInputCheckbox.type = 'checkbox'
    todoInputCheckbox.checked = todo.completed
    todoInputCheckbox.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id
        e.target.checked ? markAsCompleted(id): markAsUncompleted(id)

    }

    const todoRemoveBtn = document.createElement('a')
    todoRemoveBtn.href = '#'
    todoRemoveBtn.innerHTML = `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 460.775 460.775" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"></path> </g>
    </svg>`

    todoRemoveBtn.onclick = (e) => {
        let id = e.target.closest('.todo-item').dataset.id
        removeTodo(id)
    }

    todoTextSpan.prepend(todoInputCheckbox)
    todoDiv.appendChild(todoTextSpan)
    todoDiv.appendChild(todoRemoveBtn)

    return todoDiv
}