const tasksDOM = document.querySelector('.tasks')
const idDOM = document.querySelector('.tasksid')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const formMasterDOM = document.querySelector('.task-form-master') 

const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
// Load tasks from /api/tasks
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
<div class="task-links">



<!-- edit link -->
<a href='#' onclick="edittodo('${taskID}')"  class="edit-link">

<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${taskID}">
<i class="fas fa-trash"></i>
</button>
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

// const showTasksMaster = async () => {
//   loadingDOM.style.visibility = 'visible'
//   try {
//     const {
//       data: { tasks },
//     } = await axios.get('/api/v1/tasks')
//     if (tasks.length < 1) {
//       idDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
//       loadingDOM.style.visibility = 'hidden'
//       return
//     }
//     const allTasks = tasks
//       .map((task) => {
//         const { completed, _id: taskID, name } = task
//         return `<div class="single-task ${completed && 'task-completed'}">
// <h5><span><i class="far fa-check-circle"></i></span> ID : ${taskID}<br>Name : ${name}</h5>
// <div class="task-links">



// <!-- edit link -->
// <a href='#' onclick="edittodo('${taskID}')"  class="edit-link">

// <i class="fas fa-edit"></i>
// </a>
// <!-- delete btn -->
// <button type="button" class="delete-btn" data-id="${taskID}">
// <i class="fas fa-trash"></i>
// </button>
// </div>
// </div>`
//       })
//       .join('')
//       idDOM.innerHTML = allTasks

//   } catch (error) {
//     taskIDDOM.innerHTML =
//       '<h5 class="empty-list">There was an error, please try later....</h5>'
//   }
//   loadingDOM.style.visibility = 'hidden'
// }

// showTasksMaster()

// delete task /api/tasks/:id

tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    window.confirm("Are you shure to delete this? if yes than type delete for delete");
    let person = prompt("type for 'delete' and type 'do not delete'", "do not delete");

    if (person == "delete") {
      try {
        await axios.delete(`/api/v1/tasks/${id}`)
        showTasks()
      } catch (error) {
        console.log(error)
      }
      alert("Deleted");
    }
    else if (person !== "delete") {
      alert("not deleted");
    }

  }
  loadingDOM.style.visibility = 'hidden'
})

// form

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value

  try {
    await axios.post('/api/v1/tasks', { name })
    showTasks()
    taskInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})

// function masterfun() {
//   console.log("Hellllo");
// }

// formDOM.addEventListener('click', async (e) => {
//   e.preventDefault()
//   const name = taskInputDOM.value

//   window.location.href = 'http://localhost:3001/task.html';

// })

// formMasterDOM.addEventListener('click', async (e) => {
//   e.preventDefault()
//   const name = taskInputDOM.value
//   console.log("Hellllllo");

//   window.location.href = 'http://localhost:3001/index.html';

// })


// -------------------edit task-------------------------------

const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName


function close() {  
  var element = document.getElementById("card");
  element.classList.add("container2");

  var element = document.getElementById("task-form");
  element.classList.remove("task-form2");

  var element = document.getElementById("all-task");
  element.classList.remove("task-form2");
}
let closebtn = document.querySelectorAll(".close");
closebtn.forEach(e => {
  // console.error(e);
  e.addEventListener("click", () => { close() })

});

let addbtn = document.querySelectorAll(".card");
addbtn.forEach(e => {
  // console.error(e);
  e.addEventListener("click", () => { edittodo() })

});

// function edittodo(id){
//   var element = document.getElementById("card");
//   element.classList.add("container2");
//}


async function edittodo(id) {

  var element = document.getElementById("card");
  element.classList.remove("container2");

  var element = document.getElementById("task-form");
  element.classList.add("task-form2");

  var element = document.getElementById("all-task");
  element.classList.add("task-form2");

  const response = await fetch(`http://localhost:3001/api/v1/tasks/${id}`);
  const task = await response.json();
  console.log(task.task.name);
  taskIDDOM.textContent = task.task._id
  taskNameDOM.value = task.task.name

  editFormDOM.addEventListener('submit', async (e) => {
    editBtnDOM.textContent = 'Loading...'
    e.preventDefault()
    try {
      const taskName = taskNameDOM.value
      const taskCompleted = taskCompletedDOM.checked

      const name = task.task.name;
      const taskID = task.task._id;
      const completed = task.task.completed;
  
      const response = await fetch(`http://localhost:3001/api/v1/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: taskName,
          completed: taskCompleted,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json())
      .then((json) => console.log(json));
  
      

      console.log(name);

      // let namef = name
  
      taskIDDOM.textContent = taskID
      taskNameDOM.value = name
      tempName = name
      if (completed) {
        taskCompletedDOM.checked = true
      }
      formAlertDOM.style.display = 'block'
      formAlertDOM.textContent = `success, edited task`
      formAlertDOM.classList.add('text-success')
      alert("Edited Successfully");
      if (alert) {
        window.location.href = 'http://localhost:3001/index.html';
  
      }
    } catch (error) {
      console.error(error)
      taskNameDOM.value = tempName
      formAlertDOM.style.display = 'block'
      formAlertDOM.innerHTML = `error, please try again`
    }
    editBtnDOM.textContent = 'Edit'
    setTimeout(() => {
      formAlertDOM.style.display = 'none'
      formAlertDOM.classList.remove('text-success')
    }, 3000)
  })

}


// const edittodo = async (id) => {

//   var element = document.getElementById("card");
//   element.classList.add("container2");

//   console.log(id);


//   fetch("http://localhost:3001/api/v1/tasks")
   
//     // Converting received data to JSON
//     .then(response => response.json())
//     .then(json => {
  
//         // Create a variable to store HTML
//         let li = `<tr><th>Name</th><th>Email</th></tr>`;
       
//         // Loop through each data and add a table row
//         json.forEach(task => {
//             li += `<tr>
//                 <td>${task.name} </td>
//             </tr>`;
//         });
  
//     // Display result
//     document.getElementById("task-name").innerHTML = li;
//     console.log(li);
// });

//   try {
//     taskIDDOM.textContent = id
//     const {
//       data: { task },
//     } = fetch("http://localhost:3001/api/v1/tasks", {
     
//     // Adding method type
//     method: "GET",
     
//     // Adding body or contents to send
//     body: JSON.stringify(task)
// })
// console.log(data.json());
//   } catch (error) {
//     console.log(error)
//   }

// }

//   try {
//     taskIDDOM.textContent = id
//     const {
//       data: { task },
//     } = axios.get(`/api/v1/tasks/${id}`)
    
//     const { _id: taskID, completed, name } = task

    
//     taskNameDOM.value = name
//     tempName = name
//     if (completed) {
//       taskCompletedDOM.checked = true
//     }
//   } catch (error) {
//     console.log(error)
//   }

// }


// editFormDOM.addEventListener('submit', async (e) => {
//   editBtnDOM.textContent = 'Loading...'
//   e.preventDefault()
//   try {
//     const taskName = taskNameDOM.value
//     const taskCompleted = taskCompletedDOM.checked

//     const {
//       data: { task },
//     } = await axios.patch(`/api/v1/tasks/${id}`, {
//       name: taskName,
//       completed: taskCompleted,
//     })

//     const { _id: taskID, completed, name } = task

//     taskIDDOM.textContent = taskID
//     taskNameDOM.value = name
//     tempName = name
//     if (completed) {
//       taskCompletedDOM.checked = true
//     }
//     formAlertDOM.style.display = 'block'
//     formAlertDOM.textContent = `success, edited task`
//     formAlertDOM.classList.add('text-success')
//     alert("Edited Successfully");
//     if (alert) {
//       window.location.href = 'http://localhost:3001/index.html';

//     }
//   } catch (error) {
//     console.error(error)
//     taskNameDOM.value = tempName
//     formAlertDOM.style.display = 'block'
//     formAlertDOM.innerHTML = `error, please try again`
//   }
//   editBtnDOM.textContent = 'Edit'
//   setTimeout(() => {
//     formAlertDOM.style.display = 'none'
//     formAlertDOM.classList.remove('text-success')
//   }, 3000)
// })


// edit();