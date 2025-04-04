document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const totalTasksSpan = document.getElementById('totalTasks');
    const completedTasksSpan = document.getElementById('completedTasks');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let totalTasks = 0;
    let completedTasks = 0;
    
    // Función para mostrar las tareas
    function renderTasks() {
        taskList.innerHTML = '';
        totalTasks = tasks.length;
        completedTasks = tasks.filter(task => task.completed).length;
        
        totalTasksSpan.textContent = totalTasks;
        completedTasksSpan.textContent = completedTasks;
        
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            
            const taskCheckbox = document.createElement('input');
            taskCheckbox.type = 'checkbox';
            taskCheckbox.checked = task.completed;
            taskCheckbox.addEventListener('change', () => toggleTaskComplete(index));
            
            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task.text;
            if (task.completed) {
                taskText.classList.add('completed');
            }
            
            const taskActions = document.createElement('div');
            taskActions.className = 'task-actions';
            
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.textContent = 'Editar';
            editBtn.addEventListener('click', () => editTask(index));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.addEventListener('click', () => deleteTask(index));
            
            taskActions.appendChild(editBtn);
            taskActions.appendChild(deleteBtn);
            
            taskItem.appendChild(taskCheckbox);
            taskItem.appendChild(taskText);
            taskItem.appendChild(taskActions);
            
            taskList.appendChild(taskItem);
        });
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Función para agregar una nueva tarea
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({
                text: taskText,
                completed: false
            });
            taskInput.value = '';
            renderTasks();
            // Aquí iría el commit para "Añadir tarea"
            console.log('Commit: Añadir tarea funcionalidad implementada');
        }
    }
    
    // Función para editar una tarea
    function editTask(index) {
        const newText = prompt('Editar tarea:', tasks[index].text);
        if (newText !== null && newText.trim() !== '') {
            tasks[index].text = newText.trim();
            renderTasks();
            // Aquí iría el commit para "Editar tarea"
            console.log('Commit: Editar tarea funcionalidad implementada');
        }
    }
    
    // Función para eliminar una tarea
    function deleteTask(index) {
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            tasks.splice(index, 1);
            renderTasks();
        }
    }
    
    // Función para marcar tarea como completada o pendiente
    function toggleTaskComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Mostrar tareas al cargar la página
    renderTasks();
});