let incompleteTasks = [];
let completedTasks = [];

const inputElement = document.querySelector('.input');
const delFirstTaskButton = document.querySelector('.delFirstTask');
const delLastTaskButton = document.querySelector('.delLastTask');
const styleEvenButton = document.querySelector('.styleEven');
const styleOddButton = document.querySelector('.styleOdd');

delLastTaskButton.addEventListener('click', removeLastTask);
delFirstTaskButton.addEventListener('click', removeFirstTask);
styleEvenButton.addEventListener('click', styleEvenTasks);
styleOddButton.addEventListener('click', styleOddTasks);

inputElement.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const taskText = inputElement.value.trim();
    if (taskText) {
      incompleteTasks.push(taskText);
      updateTaskLists();
      saveToLocalStorage();
      inputElement.value = ''; 
    }
  }
});

 
loadFromLocalStorage();

function updateTaskLists() {
  const incompleteTaskList = document.getElementById('incompleteTaskList');
  const completedTaskList = document.getElementById('completedTaskList');

  incompleteTaskList.innerHTML = '';
  completedTaskList.innerHTML = '';

  incompleteTasks.forEach((task, index) => {
    const taskElement = createTaskElement(task, index, false);
    incompleteTaskList.appendChild(taskElement);
  });

  completedTasks.forEach((task, index) => {
    const taskElement = createTaskElement(task, index, true);
    completedTaskList.appendChild(taskElement);
  });
}

function createTaskElement(task, index, isCompleted) {
  const li = document.createElement('li');
  li.className = `task${isCompleted ? ' completed' : ''}`;

  const taskTextSpan = document.createElement('span');
  taskTextSpan.innerText = `Задача ${index + 1}: ${task}`;
  li.appendChild(taskTextSpan);

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Удалить';
  deleteButton.onclick = () => deleteTaskAtIndex(index, isCompleted);
  li.appendChild(deleteButton);

  if (isCompleted) {
    const markIncompleteButton = document.createElement('button');
    markIncompleteButton.innerText = 'Отметить как незавершенную';
    markIncompleteButton.onclick = () => markTaskIncomplete(index);
    li.appendChild(markIncompleteButton);
  } else {
    const markCompletedButton = document.createElement('button');
    markCompletedButton.innerText = 'Отметить выполненной';
    markCompletedButton.onclick = () => markTaskCompleted(index);
    li.appendChild(markCompletedButton);
  }

  return li;
}

function markTaskIncomplete(index) {
  if (index >= 0 && index < completedTasks.length) {
    const incompleteTask = completedTasks.splice(index, 1)[0];
    incompleteTasks.push(incompleteTask);
    updateTaskLists();
    saveToLocalStorage();
  } else {
    alert('Неверный номер задачи.');
  }
}

function addTask() {
  const taskText = prompt('Введите текст задачи:');
  if (taskText) {
    incompleteTasks.push(taskText);
    updateTaskLists();
    saveToLocalStorage();
  }
}

function deleteTaskAtIndex(index, isCompleted) {
  if (isCompleted) {
    if (index >= 0 && index < completedTasks.length) {
      completedTasks.splice(index, 1);
      updateTaskLists();
      saveToLocalStorage();
    } else {
      alert('Неверный индекс задачи.');
    }
  } else {
    if (index >= 0 && index < incompleteTasks.length) {
      incompleteTasks.splice(index, 1);
      updateTaskLists();
      saveToLocalStorage();
    } else {
      alert('Неверный индекс задачи.');
    }
  }
}

function removeFirstTask() {
  incompleteTasks.shift();
  updateTaskLists();
  saveToLocalStorage();
}

function removeLastTask() {
  incompleteTasks.pop();
  updateTaskLists();
  saveToLocalStorage();
}

function markTaskCompleted(index) {
  if (index >= 0 && index < incompleteTasks.length) {
    const completedTask = incompleteTasks.splice(index, 1)[0];
    completedTasks.push(completedTask);
    updateTaskLists();
    saveToLocalStorage();
  } else {
    alert('Неверный номер задачи.');
  }
}

function highlightEvenTasks() {
  const incompleteTaskList = document.getElementById('incompleteTaskList');
  Array.from(incompleteTaskList.children).forEach((task, index) => {
    if (index % 2 === 1) {
      task.classList.toggle('highlighted');
    }
  });
}

function highlightOddTasks() {
  const incompleteTaskList = document.getElementById('incompleteTaskList');
  Array.from(incompleteTaskList.children).forEach((task, index) => {
    if (index % 2 === 0) {
      task.classList.toggle('highlighted');
    }
  });
}

function saveToLocalStorage() {
  localStorage.setItem('incompleteTasks', JSON.stringify(incompleteTasks));
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

function loadFromLocalStorage() {
  const incompleteTasksData = localStorage.getItem('incompleteTasks');
  const completedTasksData = localStorage.getItem('completedTasks');

  if (incompleteTasksData) {
    incompleteTasks = JSON.parse(incompleteTasksData);
  }

  if (completedTasksData) {
    completedTasks = JSON.parse(completedTasksData);
  }

  updateTaskLists();
}

function removeFirstTask() {
  if (incompleteTasks.length > 0) {
    incompleteTasks.shift();
    updateTaskLists();
    saveToLocalStorage();
  } else {
    alert('Нет незавершенных задач для удаления.');
  }
}

function removeLastTask() {
  if (incompleteTasks.length > 0) {
    incompleteTasks.pop();
    updateTaskLists();
    saveToLocalStorage();
  } else {
    alert('Нет незавершенных задач для удаления.');
  }
}

function styleEvenTasks() {
  const incompleteTaskList = document.getElementById('incompleteTaskList');
  const completedTaskList = document.getElementById('completedTaskList');

  styleEvenListItems(incompleteTaskList);
  styleEvenListItems(completedTaskList);
}

function styleEvenListItems(taskList) {
  const tasks = taskList.querySelectorAll('.task');
  tasks.forEach((task, index) => {
    if (index % 2 === 1) {
      task.classList.toggle('highlighted');
    }
  });
}

function styleOddTasks() {
  const incompleteTaskList = document.getElementById('incompleteTaskList');
  const completedTaskList = document.getElementById('completedTaskList');

  styleOddListItems(incompleteTaskList);
  styleOddListItems(completedTaskList);
}

function styleOddListItems(taskList) {
  const tasks = taskList.querySelectorAll('.task');
  tasks.forEach((task, index) => {
    if (index % 2 === 0) {
      task.classList.toggle('highlighted');
    }
  });
}
