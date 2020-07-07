// Define UI Variables
const form = document.querySelector('#task-form'); // form tag to add new task
const taskList = document.querySelector('.collection'); // ul to dynamically add li's to for all of the outstanding tasks
const clearBtn = document.querySelector('.clear-tasks'); //a tag at the bottom to clear all tasks
const filter = document.querySelector('#filter'); // text input field to dynamically filter tasks
const taskInput = document.querySelector('#task'); // text input field to type new tasks

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
	// DOM Load event
	document.addEventListener('DOMContentLoaded', getTasks);
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear task event
	clearBtn.addEventListener('click', clearTasks);
	// Filter tasks event
	filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.forEach(function(task) {
		// Create li element
		const li = document.createElement('li');
		// Add class
		li.className = 'collection-item';
		// Create text node and append to li
		li.appendChild(document.createTextNode(task));
		// Create new link element
		const link = document.createElement('a');
		// Add class
		link.className = 'delete-item secondary-content';
		// Add icon html
		link.innerHTML = '<i class="fas fa-trash-alt"></i>';
		// Append the link to li
		li.appendChild(link);
		// Append li to the ul
		taskList.appendChild(li);
	});
}

// Add Task
function addTask(e) {
	if (taskInput.value === '') {
		alert('Add a task');
	}

	// Create li element
	const li = document.createElement('li');
	// Add class
	li.className = 'collection-item';
	// Create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// Create new link element
	const link = document.createElement('a');
	// Add class
	link.className = 'delete-item secondary-content';
	// Add icon html
	link.innerHTML = '<i class="fas fa-trash-alt"></i>';
	// Append the link to li
	li.appendChild(link);
	// Append li to the ul
	taskList.appendChild(li);

	// Store in local storage
	storeTaskInLocalStorage(taskInput.value);

	// Clear input
	taskInput.value = '';

	e.preventDefault();
}

// Store Task in Local Storage
function storeTaskInLocalStorage(task) {
	// Check to see if there are already any tasks in memory
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	// Push new task to array
	tasks.push(task);
	// Save array to local storage again
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Reomve Task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are you sure you want to delete that task?')) {
			e.target.parentElement.parentElement.remove();

			//Remove from Local Storage
			removeTaskFromLocalStroage(e.target.parentElement.parentElement);
		}
	}
}

// Remove from Local Storage
function removeTaskFromLocalStroage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
	// Could just remove innerHTML for an easy way to clear all from UI like commented line below
	// taskList.innerHTML = '';
	// Faster method is to use a while loop, see article https://jsperf.com/innerhtml-vs-removechild
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
	// Clear from Local Storage
	clearTasksFromLocalStorage();
}

// Clear All Tasks from Local Storage
function clearTasksFromLocalStorage() {
	localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function(task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}
