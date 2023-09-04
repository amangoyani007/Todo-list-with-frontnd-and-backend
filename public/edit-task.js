const tasksDOM = document.querySelector('.tasks')
const idDOM = document.querySelector('.tasksid')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const formMasterDOM = document.querySelector('.task-form-master')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')

const showTasksMaster = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks')
    if (tasks.length < 1) {
      idDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name } = task
        return `<div class="single-task ${completed && 'task-completed'}">
        <select id="cars">
  <option value="volvo">${taskID}</option>
</select>
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="task-links">



<!-- edit link -->
<a href='#' onclick="edittodo('${taskID}')"  class="edit-link">


</a>
</button>
</div>
</div>`
      })
      .join('')
      idDOM.innerHTML = allTasks

  } catch (error) {
    taskIDDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasksMaster()