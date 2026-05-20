
let tasks = [];

$('form').on('submit', function (e) {
  e.preventDefault();
  addTask();
});

function addTask() {
  const $taskInput = $('#new-task');
  const taskValue = $taskInput.val().trim();

  if (taskValue !== '') {
    const taskObj = {
      id: Date.now(),
      text: taskValue,
      completed: false
    };
    tasks.push(taskObj);

    const $listItem = $('<li></li>')
      .addClass('todo-item')
      .attr('data-id', taskObj.id);

    const $taskText = $('<span></span>').text(taskObj.text);
    $listItem.append($taskText);

    $listItem.on('click', function () {
      taskObj.completed = !taskObj.completed;
      $listItem.toggleClass('completed');
    });

    addButtonToTask($listItem, $taskText);
    $('#todo-list').append($listItem);
    $taskInput.val('');
  }
}

// Функция создания кнопок
function addButtonToTask($listItem, $taskText) {
  const taskId = $listItem.data('id');
  const $buttonsContainer = $('<div class="task-buttons"></div>');
  
  const $renameBtn = $('<button class="rename-btn">Редактировать</button>');
  const $deleteBtn = $('<button class="delete-btn">Удалить</button>');

  $renameBtn.on('click', function (e) {
    e.stopPropagation();
    
    const taskObj = tasks.find(t => t.id === taskId);
    if (!taskObj) return;

    const newName = prompt('Введите новое название задачи:', taskObj.text);

    if (newName && newName.trim() !== '') {
      const cleanName = newName.trim();
      taskObj.text = cleanName; 
      $taskText.text(cleanName); 
    }
  });

  $deleteBtn.on('click', function (e) {
    e.stopPropagation();
    
    tasks = tasks.filter(t => t.id !== taskId);
    // Удаляем из верстки
    $listItem.remove();
  });

  $buttonsContainer.append($renameBtn, $deleteBtn);
  $listItem.append($buttonsContainer);
}
