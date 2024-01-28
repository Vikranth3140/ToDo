// app.js

document.addEventListener('DOMContentLoaded', function () {
    const todoList = document.getElementById('app');

    // Function to create a new task element
    function createTaskElement(taskText, isCompleted) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (isCompleted) {
            taskElement.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isCompleted;
        checkbox.addEventListener('change', function () {
            taskElement.classList.toggle('completed', checkbox.checked);
        });

        const taskTextElement = document.createElement('span');
        taskTextElement.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            taskElement.remove();
        });

        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskTextElement);
        taskElement.appendChild(deleteButton);

        return taskElement;
    }

    // Function to add a new task to the list
    function addTask(taskText) {
        const taskElement = createTaskElement(taskText, false);
        todoList.appendChild(taskElement);
    }

    // Event listener for the form submission
    const form = document.createElement('form');
    const input = document.createElement('input');
    const submitButton = document.createElement('button');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskText = input.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            input.value = '';
        }
    });

    input.placeholder = 'Add a new task';
    submitButton.textContent = 'Add Task';

    form.appendChild(input);
    form.appendChild(submitButton);
    todoList.appendChild(form);
});