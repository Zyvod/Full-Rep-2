document.addEventListener('DOMContentLoaded', () => {


const Container = document.getElementById('Container')
const pageHeader = document.getElementById('PageHeader')
const taskBtn = document.getElementById('getTasksBtn')


async function getTasks () {
  try {
    await fetch(`http://localhost:3000/api/alltasks`)
    .then( response => response.json() )
    .then( data => {
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

async function displayItems(someData) {
  let index = 0
  let children = document.getElementsByTagName('li')
  console.log(children)
  someData.forEach(data => {
    children[index].innerHTML = data.task
    index++
  })
}

})