// app.js

document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const clearAllButton = document.getElementById('clearAll');
    const clearCompletedButton = document.getElementById('clearCompleted');
    const sortTasksButton = document.getElementById('sortTasks');
    const totalTasksCount = document.getElementById('totalTasks');
    const completedTasksCount = document.getElementById('completedTasks');

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    clearAllButton.addEventListener('click', function () {
        clearAllTasks();
    });

    clearCompletedButton.addEventListener('click', function () {
        clearCompletedTasks();
    });

    sortTasksButton.addEventListener('click', function () {
        sortTasks();
    });

    function addTask(taskText, isCompleted = false) {
        const taskElement = createTaskElement(taskText, isCompleted);
        taskList.appendChild(taskElement);
        updateTaskCounts();
    }

    function createTaskElement(taskText, isCompleted) {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        if (isCompleted) {
            taskElement.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isCompleted;
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('change', function () {
            taskElement.classList.toggle('completed', checkbox.checked);
            updateTaskCounts();
        });

        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = taskText;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', function () {
            const newText = prompt('Edit Task:', taskText);
            if (newText !== null && newText.trim() !== '') {
                taskTextElement.textContent = newText.trim();
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            taskElement.remove();
            updateTaskCounts();
        });

        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskTextElement);
        taskElement.appendChild(editButton);
        taskElement.appendChild(deleteButton);

        return taskElement;
    }

    function clearAllTasks() {
        taskList.innerHTML = '';
        updateTaskCounts();
    }

    function clearCompletedTasks() {
        const completedTasks = document.querySelectorAll('.task.completed');
        completedTasks.forEach(function (task) {
            task.remove();
        });
        updateTaskCounts();
    }

    function sortTasks() {
        const tasks = Array.from(taskList.children);
        tasks.sort(function (a, b) {
            const aText = a.querySelector('span').textContent.toLowerCase();
            const bText = b.querySelector('span').textContent.toLowerCase();
            return aText.localeCompare(bText);
        });

        taskList.innerHTML = '';
        tasks.forEach(function (task) {
            taskList.appendChild(task);
        });
        updateTaskCounts();
    }

    function updateTaskCounts() {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.task.completed').length;
        totalTasksCount.textContent = totalTasks;
        completedTasksCount.textContent = completedTasks;
    }
});