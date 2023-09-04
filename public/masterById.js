const tasksDOM = document.querySelector('.tasks')
const idDOM = document.querySelector('.tasksid')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const formMasterDOM = document.querySelector('.task-form-master')

const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')


async function edittodo() {

    const response = await fetch(`http://localhost:3001/api/v1/tasks`);
    const task = await response.json();
    console.log(task.task.name);
    //   taskIDDOM.textContent = task.task._id
    tasksDOM.value = task.task.name

}

edittodo();

const showTasks = async () => {
    loadingDOM.style.visibility = 'visible'
    try {
        const {
            data: { tasks },
        } = await axios.get('/api/v1/tasks')
        if (tasks.length < 1) {
            tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
            loadingDOM.style.visibility = 'hidden'
            return
        }
        const allTasks = tasks
            .map((task) => {
                const { completed, _id: taskID, name } = task
                return `<div class="single-task ${completed && 'task-completed'}">
  <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
  <select id="cars" class="me-1">
  <option value="volvo">${taskID}</option>
</select>
  <div class="task-links">  
  
  </div>
  </div>`
            })
            .join('')
        tasksDOM.innerHTML = allTasks

    } catch (error) {
        tasksDOM.innerHTML =
            '<h5 class="empty-list">There was an error, please try later....</h5>'
    }
    loadingDOM.style.visibility = 'hidden'
}

showTasks()