document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const filters = document.querySelectorAll('.btn-group-toggle .btn');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    addTaskBtn.addEventListener('click', () => {
        if (newTaskInput.value.trim() !== '') {
            tasks.push({ text: newTaskInput.value, completed: false });
            newTaskInput.value = '';
            saveAndRenderTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'INPUT') {
            const index = e.target.closest('li').dataset.index;
            tasks[index].completed = e.target.checked;
            saveAndRenderTasks();
        } else if (e.target.classList.contains('fa-trash')) {
            const index = e.target.closest('li').dataset.index;
            tasks.splice(index, 1);
            saveAndRenderTasks();
        }
    });

    deleteAllBtn.addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed);
        saveAndRenderTasks();
    });

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            saveAndRenderTasks();
        });
    });

    function saveAndRenderTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        const filter = document.querySelector('.btn-group-toggle .btn.active input').id;
        taskList.innerHTML = '';

        const filteredTasks = tasks.filter(task => {
            if (filter === 'all') return true;
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
        });

        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'completed' : ''}`;
            li.dataset.index = index;
            li.innerHTML = `
                <div>
                    <input type="checkbox" class="mr-2" ${task.completed ? 'checked' : ''}>
                    <span>${task.text}</span>
                </div>
                <i class="fas fa-trash"></i>
            `;
            taskList.appendChild(li);
        });

        const completedTasksCount = tasks.filter(task => task.completed).length;
        deleteAllBtn.textContent = `Delete All Completed`;
        deleteAllBtn.classList.toggle('hidden', !(filter === 'completed' && completedTasksCount > 0));
    }

    saveAndRenderTasks();
});
