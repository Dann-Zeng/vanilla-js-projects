const input = document.getElementById('input');
const form = document.getElementById('form');
const taskUL = document.getElementById('tasks');

const tasks = JSON.parse(localStorage.getItem('tasks'));

if (tasks) {
  tasks.forEach((task) => {
    addTask(task);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  addTask();
});

function addTask(task) {
  let taskText = input.value;
  if (task) {
    taskText = task.text;
  }

  if (taskText) {
    const taskEl = document.createElement('li');
    if (task && task.completed) {
      taskEl.classList.add('completed');
    }

    taskEl.innerText = taskText;

    taskEl.addEventListener('click', () => {
      taskEl.classList.toggle('completed');
      updateLs();
    });

    taskEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      taskEl.remove();
      updateLs();
    });

    taskUL.appendChild(taskEl);
    input.value = '';
    updateLs();
  }
}

function updateLs() {
  let tasksEl = document.querySelectorAll('li');
  let tasks = [];
  tasksEl.forEach((task) => {
    tasks.push({
      text: task.innerText,
      completed: task.classList.contains('completed'),
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
