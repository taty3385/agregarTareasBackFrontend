const title = document.getElementById("titulo");
const description = document.getElementById("descripcion");
const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const submitButton = document.getElementById("agregar-tarea");
const API = "http://localhost:3000/api/tasks";

let editingTaskId = null; 

// Agregar o Editar tarea
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskData = {
    title: title.value,
    description: description.value,
  };

  // Si estamos editando
  if (editingTaskId) {
    fetch(`${API}/${editingTaskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    })
      .then(res => res.json())
      .then(() => {
        alert("Tarea actualizada");
        resetForm();
        reloadTasks();
      });
  } else {
    // Si estamos agregando nueva tarea
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    })
      .then(res => res.json())
      .then(data => {
        alert("Tarea agregada");
        renderTask(data);
        form.reset();
      });
  }
});

// Cargar todas las tareas al iniciar
window.onload = () => {
  reloadTasks();
};

function reloadTasks() {
  taskList.innerHTML = "";
  fetch(API)
    .then(res => res.json())
    .then(data => {
      data.tasks.forEach(renderTask);
    });
}

// Función para mostrar una tarea
function renderTask(task) {
  const li = document.createElement("li");
  li.className = "task-card";

  const taskInfo = document.createElement("div");
  taskInfo.className = "task-info";
  taskInfo.innerHTML = `<strong>${task.title}</strong><br>${task.description}`;

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "task-buttons";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Editar";
  editBtn.onclick = () => {
    title.value = task.title;
    description.value = task.description;
    editingTaskId = task.id;
    submitButton.textContent = "Actualizar Tarea";
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Eliminar";
  deleteBtn.onclick = () => {
    if (confirm("¿Eliminar esta tarea?")) {
      fetch(`${API}/${task.id}`, {
        method: "DELETE"
      })
        .then(() => {
          li.remove();
          alert("Tarea eliminada");
        });
    }
  };

  buttonsDiv.appendChild(editBtn);
  buttonsDiv.appendChild(deleteBtn);
  li.appendChild(taskInfo);
  li.appendChild(buttonsDiv);
  taskList.appendChild(li);
}

// Buscar por ID
document.getElementById("buscar-btn").addEventListener("click", () => {
  const id = document.getElementById("buscar-id").value;
  fetch(`${API}/${id}`)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      document.getElementById("task-form").style.display = "none";

      const resultado = document.getElementById("resultado-busqueda");
      resultado.innerHTML = `
        <div class="task-card">
          <div class="task-info">
            <p><strong>ID:</strong> ${data.task.id}</p>
            <p><strong>Título:</strong> ${data.task.title}</p>
            <p><strong>Descripción:</strong> ${data.task.description}</p>
          </div>
          <div class="task-buttons">
            <button id="cerrar-busqueda">Cerrar</button>
          </div>
        </div>
      `;

      document.getElementById("cerrar-busqueda").addEventListener("click", () => {
        resultado.innerHTML = "";
        document.getElementById("task-form").style.display = "block";
      });
    })
    .catch(() => {
      alert("Tarea no encontrada");
    });
});


function resetForm() {
  editingTaskId = null;
  form.reset();
  submitButton.textContent = "Agregar Tarea";
}
