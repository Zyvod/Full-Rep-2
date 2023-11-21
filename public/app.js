document.addEventListener('DOMContentLoaded', () => {


const Container = document.getElementById('Container')
const pageHeader = document.getElementById('PageHeader')
const taskBtn = document.getElementById('getTasksBtn')
const createTaskBtn = document.getElementById('createTaskBtn')
const appDiv = document.getElementById('appDiv')
const headerDiv = document.getElementById('headerDiv')
const taskList = document.getElementById('TaskList')
async function getTasks () {
  try {
    await fetch(`http://localhost:3000/api/alltasks`)
    .then( response => response.json() )
    .then( data => {
      console.log(data)
      displayItems(data)
    })
  } catch(error) {
    console.error('Error:',error)
  }
}

taskBtn.addEventListener('click', (e) => {
  console.log('get tasks')
  getTasks()
})

createTaskBtn.addEventListener('click', (e) => {
  const taskInput = document.createElement('input')
  const taskNameInput = document.createElement('input')
  const enterTaskBtn = document.createElement('button')

  taskNameInput.type = 'text'
  taskNameInput.placeholder = 'Enter Task Name'

  taskInput.type = 'text'
  taskInput.placeholder = 'Enter Task'

  enterTaskBtn.textContent = 'Enter Task'
  enterTaskBtn.addEventListener('click', (e) => {
    createTask(taskInput.value, taskNameInput.value)
  })

  headerDiv.appendChild(taskInput)
  headerDiv.appendChild(taskNameInput)
  headerDiv.appendChild(enterTaskBtn)
})


async function createTask (input1,input2) {
  let data = {
    task: input1,
    name: input2
  }
  try {
    await fetch('http://localhost:3000/api/createTask', {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json)
    .then( ressponse => {
      console.log(data)
      getTasks()
    })
  } catch(error) {
    console.error('Error:',error)
  }
}
async function displayItems(someData) {
  let index = 0
  let children = document.getElementsByTagName('li')
  someData.forEach(data => {
    if ( index < children.length ) {
      children[index].innerHTML = data.task
      index++
    } else {
    let li = document.createElement('li')
    li.class = 'list-item'

    let delBtn = document.createElement('button')
    delBtn.class = 'list-button'
    delBtn.textContent = 'Delete'

    li.innerHTML = data.task
    taskList.appendChild(li)
    taskList.appendChild(delBtn)
    }
    index++
  })

}

})

