let unitCount = 1;
let taskCounts = {};
const taskDetails = {};

function addTaskForm(unitId) {
  // Inicializa o contador de tarefas para a unidade, se necessário
  if (!taskCounts[unitId]) taskCounts[unitId] = 0;
  taskCounts[unitId]++;

  const taskId = taskCounts[unitId];
  const taskList = document.getElementById(`tasks-list-${unitId}`);

  // Cria o formulário para a nova tarefa
  const newTask = document.createElement("div");
  newTask.classList.add("task-details");
  newTask.id = `task-${unitId}-${taskId}`;
  newTask.innerHTML = `
    <h5>Tarefa ${taskId}</h5>
    <label for="task-title-${unitId}-${taskId}">Título:</label>
    <input type="text" id="task-title-${unitId}-${taskId}" name="task-title-${unitId}" placeholder="Título da Tarefa" required>

    <h4>Tipo da tarefa</h4>
    <label for="task-type-forum-${unitId}-${taskId}">Fórum:</label>
    <input type="radio" id="task-type-forum-${unitId}-${taskId}" name="task-type-${unitId}-${taskId}" value="Fórum" required>

    <label for="task-type-quiz-${unitId}-${taskId}">Quiz:</label>
    <input type="radio" id="task-type-quiz-${unitId}-${taskId}" name="task-type-${unitId}-${taskId}" value="Quiz" required>

    <label for="task-type-questionario-${unitId}-${taskId}">Questionário:</label>
    <input type="radio" id="task-type-questionario-${unitId}-${taskId}" name="task-type-${unitId}-${taskId}" value="Questionário" required>

    <label for="task-type-aula-${unitId}-${taskId}">Aula Re:</label>
    <input type="radio" id="task-type-aula-${unitId}-${taskId}" name="task-type-${unitId}-${taskId}" value="Aula Re" required>

    <label for="task-weight-${unitId}-${taskId}">Peso:</label>
    <input type="number" id="task-weight-${unitId}-${taskId}" name="task-weight-${unitId}" placeholder="Peso da Tarefa" required>

    <label for="task-description-${unitId}-${taskId}">Descrição:</label>
    <textarea id="task-description-${unitId}-${taskId}" name="task-description-${unitId}" placeholder="Descrição da Tarefa" required></textarea>

    <label for="task-hours-${unitId}-${taskId}">Carga Horária:</label>
    <input type="number" id="task-hours-${unitId}-${taskId}" name="task-hours-${unitId}" placeholder="Carga Horária da Tarefa" required>
    
    <button type="button" onclick="submitTask(${unitId}, ${taskId})">Salvar Tarefa</button>
  `;
  taskList.appendChild(newTask);
}

function addNewUnit() {
  unitCount++;  // Incrementa o contador para criar a próxima unidade

  // Cria uma nova unidade
  const unitContainer = document.createElement("div");
  unitContainer.classList.add("unit");
  unitContainer.id = `unit-${unitCount}`;

  // Adiciona o título da unidade e os campos necessários
  unitContainer.innerHTML = `
    <h3>Unidade ${unitCount}</h3>
    <label for="unidade-${unitCount}">Título:</label>
    <input type="text" id="unidade-${unitCount}" name="unidade-${unitCount}" placeholder="Título da Unidade ${unitCount}" required>

    <label for="ch-unidade-${unitCount}">Carga Horária:</label>
    <input type="number" id="ch-unidade-${unitCount}" name="ch-unidade-${unitCount}" placeholder="Carga Horária da Unidade ${unitCount}" required>

    <label for="periodo-unidade-${unitCount}">Período:</label>
    <input type="text" id="periodo-unidade-${unitCount}" name="periodo-unidade-${unitCount}" placeholder="Ex: 01/09/2024 a 07/09/2024" required>

    <div class="task-container" id="task-container-${unitCount}">
      <h4>Tarefas:</h4>
      <div id="tasks-list-${unitCount}"></div>
      <button type="button" onclick="addTaskForm(${unitCount})">Adicionar Tarefa</button>
    </div>
  `;

  // Adiciona a nova unidade ao container de unidades
  document.getElementById("units-container").appendChild(unitContainer);

  // Inicializa os contadores de tarefas e o array de tarefas para a nova unidade
  taskCounts[unitCount] = 0;
  taskDetails[unitCount] = [];
}

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

  const task = {
    title,
    type: type.value,
    weight,
    description,
    hours
  };

  // Salva a tarefa nos detalhes da unidade
  taskDetails[unitId].push(task);

  // Exibe a mensagem de confirmação
  showConfirmationMessage(`Tarefa ${taskId} da Unidade ${unitId} salva com sucesso!`);

  // Atualiza a lista de tarefas
  updateTaskList(unitId, taskId, title);

  // Limpa o formulário da tarefa
  clearTaskForm(unitId, taskId);
}

// Exibe uma mensagem de confirmação no lugar do alerta
function showConfirmationMessage(message) {
  const confirmationDiv = document.createElement("div");
  confirmationDiv.classList.add("confirmation-message");
  confirmationDiv.textContent = message;
  document.body.appendChild(confirmationDiv);

  setTimeout(() => {
    confirmationDiv.remove();
  }, 3000); // Mensagem desaparece após 3 segundos
}

// Atualiza a lista de tarefas exibidas
function updateTaskList(unitId, taskId, title) {
  const taskList = document.getElementById(`tasks-list-${unitId}`);
  
  // Cria o item da tarefa com link para visualizar os detalhes
  const taskElement = document.createElement("div");
  taskElement.classList.add("task-item");
  taskElement.textContent = `Tarefa ${taskId}: ${title}`;

  const taskLink = document.createElement("a");
  taskLink.href = "#";
  taskLink.textContent = " (ver detalhes)";
  taskLink.onclick = () => showTaskDetails(unitId, taskId);

  taskElement.appendChild(taskLink);
  taskList.appendChild(taskElement);
}

// Limpa o formulário da tarefa após o envio
function clearTaskForm(unitId, taskId) {
  document.getElementById(`task-title-${unitId}-${taskId}`).value = '';
  document.querySelectorAll(`input[name="task-type-${unitId}-${taskId}"]`).forEach(input => input.checked = false);
  document.getElementById(`task-weight-${unitId}-${taskId}`).value = '';
  document.getElementById(`task-description-${unitId}-${taskId}`).value = '';
  document.getElementById(`task-hours-${unitId}-${taskId}`).value = '';
}

// Função para mostrar os detalhes da tarefa no modal
function showTaskDetails(unitId, taskId) {
  const task = taskDetails[unitId][taskId - 1];
  const modalContent = document.getElementById("modal-task-details");
  modalContent.innerHTML = `
    <strong>Título:</strong> ${task.title}<br>
    <strong>Tipo:</strong> ${task.type}<br>
    <strong>Peso:</strong> ${task.weight}<br>
    <strong>Descrição:</strong> ${task.description}<br>
    <strong>Carga Horária:</strong> ${task.hours}<br>
  `;
  document.getElementById("modal").classList.remove("hide");
}

// Função para fechar o modal
function closeModal() {
  document.getElementById("modal").classList.add("hide");
}
