let unitCount = 0;
let taskDetails = {};

// Função para adicionar uma nova unidade
function addNewUnit() {
  unitCount++;
  const unitsContainer = document.getElementById("units-container");

  const unitDiv = document.createElement("div");
  unitDiv.classList.add("unit");
  unitDiv.id = `unit-${unitCount}`;

  unitDiv.innerHTML = `
    <h3>Unidade ${unitCount}</h3>
    <label for="unidade-${unitCount}">Título:</label>
    <input type="text" id="unidade-${unitCount}" name="unidade-${unitCount}" placeholder="Título da Unidade ${unitCount}" required>

    <label for="ch-unidade-${unitCount}">Carga Horária:</label>
    <input type="number" id="ch-unidade-${unitCount}" name="ch-unidade-${unitCount}" placeholder="Carga Horária da Unidade ${unitCount}" required>

    <label for="periodo-unidade-${unitCount}">Período:</label>
    <input type="text" id="periodo-unidade-${unitCount}" name="periodo-unidade-${unitCount}" placeholder="Ex: 01/09/2024 a 07/09/2024" required>

    <div id="tasks-list-${unitCount}"></div>
    <button type="button" onclick="addTaskForm(${unitCount})">Adicionar Tarefa</button>
    <button type="button" onclick="deleteUnit(${unitCount})" class="delete-unit-btn btn btn-danger mt-2">Excluir Unidade</button>
    <div class="view-tasks" id="view-tasks-${unitCount}"></div>
  `;

  unitsContainer.appendChild(unitDiv);
}

// Função para adicionar o formulário de uma nova tarefa
function addTaskForm(unitId) {
  const taskList = document.getElementById(`tasks-list-${unitId}`);
  const taskId = taskList.children.length + 1;

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-details");
  taskDiv.id = `task-${unitId}-${taskId}`;

  taskDiv.innerHTML = `
    <form>
      <h5>Tarefa ${taskId}</h5>
      <label for="task-title-${unitId}-${taskId}">Título:</label>
      <input type="text" id="task-title-${unitId}-${taskId}" placeholder="Título da Tarefa" required>
      
      <label for="task-type-${unitId}-${taskId}">Tipo:</label>
      <input type="radio" name="task-type-${unitId}-${taskId}" value="Teórica"> Teórica
      <input type="radio" name="task-type-${unitId}-${taskId}" value="Prática"> Prática

      <label for="task-weight-${unitId}-${taskId}">Peso:</label>
      <input type="number" id="task-weight-${unitId}-${taskId}" placeholder="Peso da Tarefa" required>

      <label for="task-description-${unitId}-${taskId}">Descrição:</label>
      <textarea id="task-description-${unitId}-${taskId}" placeholder="Descrição da Tarefa" required></textarea>

      <label for="task-hours-${unitId}-${taskId}">Carga Horária:</label>
      <input type="number" id="task-hours-${unitId}-${taskId}" placeholder="Carga Horária" required>

      <button type="button" onclick="submitTask(${unitId}, ${taskId})">Salvar Tarefa</button>
    </form>
  `;

  taskList.appendChild(taskDiv);
}

// Função para salvar uma tarefa
function submitTask(unitId, taskId) {
  const title = document.getElementById(`task-title-${unitId}-${taskId}`).value;
  const type = document.querySelector(`input[name="task-type-${unitId}-${taskId}"]:checked`);
  const weight = document.getElementById(`task-weight-${unitId}-${taskId}`).value;
  const description = document.getElementById(`task-description-${unitId}-${taskId}`).value;
  const hours = document.getElementById(`task-hours-${unitId}-${taskId}`).value;

  if (!title || !type || !weight || !description || !hours) {
    alert("Por favor, preencha todos os campos da tarefa.");
    return;
  }

  if (!taskDetails[unitId]) taskDetails[unitId] = [];
  taskDetails[unitId].push({
    title,
    type: type.value,
    weight,
    description,
    hours,
  });

 // VER AS TAREFAAAS
const viewTasksContainer = document.getElementById(`view-tasks-${unitId}`);
if (viewTasksContainer && !viewTasksContainer.querySelector("button")) {
  const viewTasksButton = document.createElement("button");
  viewTasksButton.textContent = "Tarefas Adicionadas";
  viewTasksButton.onclick = () => showTasks(unitId);
  viewTasksContainer.appendChild(viewTasksButton);
}

// Remover formulário da tarefa
const taskElement = document.getElementById(`task-${unitId}-${taskId}`);
if (taskElement) {
  taskElement.remove();
} else {
  console.error(`Elemento da tarefa task-${unitId}-${taskId} não encontrado.`);
}
showConfirmationMessage(`Tarefa ${taskId} salva com sucesso!`);

// Modal para exibir as tarefas
function showTasks(unitId) {
  const modalTaskDetails = document.getElementById("modal-task-details");
  modalTaskDetails.innerHTML = ""; // Limpa o conteúdo anterior

  if (taskDetails[unitId] && taskDetails[unitId].length > 0) {
    taskDetails[unitId].forEach((task, index) => {
      modalTaskDetails.innerHTML += `
        <h4>Tarefa ${index + 1}</h4>
        <strong>Título:</strong> ${task.title}<br>
        <strong>Tipo:</strong> ${task.type}<br>
        <strong>Peso:</strong> ${task.weight}<br>
        <strong>Descrição:</strong> ${task.description}<br>
        <strong>Carga Horária:</strong> ${task.hours}<br><hr>
      `;
    });
  } else {
    modalTaskDetails.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
  }

  const modal = document.getElementById("modal");
  if (modal) {
    modal.classList.remove("hide");
  } else {
    console.error("Modal não encontrado no DOM.");
  }
  console.log(showTasks);
}



// Fechar o modal
function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.classList.add("hide");
  }
}
 }

taskDetails = [
  {title:  'oi'}
];

// Modal para exibir as tarefas
function showTasks(unitId) {
  console.log('init show Tasks')
  const modalTaskDetails = document.getElementById("modal-task-details");
  modalTaskDetails.innerHTML = "";

  console.log(modalTaskDetails);
  

  if (taskDetails[unitId]) {
    console.log('running unitId ', unitId);
    
    taskDetails.forEach((task, index) => {
      console.log(task)
      modalTaskDetails.innerHTML += `
        <h4>Tarefa ${index + 1}</h4>
        <strong>Título:</strong> ${task.title}<br>
        <strong>Tipo:</strong> ${task.type}<br>
        <strong>Peso:</strong> ${task.weight}<br>
        <strong>Descrição:</strong> ${task.description}<br>
        <strong>Carga Horária:</strong> ${task.hours}<br><hr>
      `;
    });
  } else {
    modalTaskDetails.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
  }
  console.log(modalTaskDetails);
  
  document.getElementById("modal").classList.remove("hide");
  console.log('exit show Tasks')
}

// Fechar o modal
function closeModal() {
  document.getElementById("modal").classList.add("hide");
}

// Mensagem de confirmação
function showConfirmationMessage(message) {
  alert(message);
}

// Função para excluir unidade
function deleteUnit(unitId) {
  const unitElement = document.getElementById(`unit-${unitId}`);
  if (unitElement) unitElement.remove();
}
