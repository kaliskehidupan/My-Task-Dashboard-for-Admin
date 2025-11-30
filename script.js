// --- 1. DATA ARRAY (Simulasi Database) ---
let projectsData = [
  {
    id: 101,
    name: "Business Card Modern Design",
    progress: 85,
    status: "Ongoing",
    daysLeft: 3,
  },
  {
    id: 102,
    name: "Cosmetic Bottle Brand Design",
    progress: 50,
    status: "Pending",
    daysLeft: 1,
  },
  {
    id: 103,
    name: "Company One Marketing Campaign",
    progress: 95,
    status: "Completed",
    daysLeft: 0,
  },
  {
    id: 104,
    name: "Website Redesign Phase I",
    progress: 30,
    status: "Ongoing",
    daysLeft: 7,
  },
];
let nextProjectId = 105;

let taskCardsData = [
  {
    title: "Graphic Design",
    taskCount: 24,
    icon: "fa-palette",
    color: "card-pink",
  },
  {
    title: "Promotion Ads",
    taskCount: 19,
    icon: "fa-bullhorn",
    color: "card-blue",
  },
  {
    title: "Data Science",
    taskCount: 14,
    icon: "fa-trophy",
    color: "card-red",
  },
];

let expensesData = [
  {
    id: 1,
    name: "Project One",
    days: "3 Days",
    amount: 497,
    color: "text-danger",
  },
  {
    id: 2,
    name: "Project Two",
    days: "2 Days",
    amount: 136,
    color: "text-primary",
  },
  {
    id: 3,
    name: "Project Three",
    days: "3 Days",
    amount: 258,
    color: "text-warning",
  },
  {
    id: 4,
    name: "Project Four",
    days: "4 Days",
    amount: 258,
    color: "text-info",
  },
];

let scheduleData = [
  {
    user: "James Smith",
    task: "Task A",
    color: "bg-danger",
    startHour: 9,
    durationHour: 4,
  },
  {
    user: "Linda Brown",
    task: "Task B",
    color: "bg-primary",
    startHour: 11,
    durationHour: 3,
  },
  {
    user: "Robert William",
    task: "Task C",
    color: "bg-success",
    startHour: 13,
    durationHour: 2,
  },
  {
    user: "Michael Brown",
    task: "Task D",
    color: "bg-warning",
    startHour: 10,
    durationHour: 5,
  },
];

// --- 2. FUNGSI RENDER KOMPONEN VISUAL (READ) ---

function renderTaskInfoCards() {
  const container = $("#task-info-cards");
  container.empty();
  taskCardsData.forEach((item) => {
    const cardHtml = `
            <div class="col-md-4 mb-3">
                <div class="info-card-large ${item.color} d-flex align-items-center">
                    <i class="fas ${item.icon} fa-xl me-2"></i> 
                    <div>
                        <p class="mb-0 small">${item.title}</p> 
                        <h6 class="mb-0">${item.taskCount} Task</h6>
                    </div>
                </div>
            </div>
        `;
    container.append(cardHtml);
  });
}

function renderProjectCards() {
  const container = $("#project-cards");
  container.empty();
  const limitedProjects = projectsData.slice(0, 3);

  limitedProjects.forEach((project) => {
    let statusBadge = "";
    if (project.status === "Ongoing")
      statusBadge = `<span class="badge bg-danger">Ongoing</span>`;
    else if (project.status === "Pending")
      statusBadge = `<span class="badge bg-secondary">Pending</span>`;
    else statusBadge = `<span class="badge bg-success">Completed</span>`;

    const cardHtml = `
            <div class="col-md-4 mb-3">
                <div class="card project-card shadow-sm h-100">
                    <div class="card-body">
                        <i class="fas fa-credit-card text-primary mb-2"></i>
                        <div class="d-flex justify-content-between">
                            <h6 class="card-title">${project.name}</h6>
                            ${statusBadge}
                        </div>
                        <small class="text-muted">10:00 AM - 4:30 PM</small>
                        <div class="progress mt-3 mb-1" style="height: 5px;">
                            <div class="progress-bar bg-primary" role="progressbar" style="width: ${project.progress}%"></div>
                        </div>
                        <div class="d-flex justify-content-between small text-muted">
                            <span>${project.progress}%</span>
                            <span>${project.daysLeft} days left</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    container.append(cardHtml);
  });
}

function renderProjectTable() {
  const tableBody = document.getElementById("projectTableBody");
  tableBody.innerHTML = "";

  if (projectsData.length === 0) {
    tableBody.innerHTML =
      '<tr><td colspan="5" class="text-center">Belum ada data proyek.</td></tr>';
    return;
  }

  projectsData.forEach((project) => {
    const statusClass =
      project.status === "Ongoing"
        ? "text-danger"
        : project.status === "Completed"
        ? "text-success"
        : "text-warning";

    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${project.id}</td>
            <td>${project.name}</td>
            <td class="${statusClass} fw-bold">${project.status}</td>
            <td>
                <div class="progress" style="height: 8px;">
                    <div class="progress-bar" role="progressbar" style="width: ${
                      project.progress
                    }%; background-color: ${
      project.progress > 80
        ? "#28a745"
        : project.progress > 50
        ? "#ffc107"
        : "#dc3545"
    };"></div>
                </div>
                <small>${project.progress}%</small>
            </td>
            <td>
                <button class="btn btn-sm btn-warning me-1 edit-btn" data-id="${
                  project.id
                }">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${
                  project.id
                }">Hapus</button>
            </td>
        `;
    tableBody.appendChild(row);
  });
}

function renderTaskSchedule() {
  const container = $("#task-schedule-container");
  container.empty();

  // Header Waktu (Simulasi Skala 8 AM - 6 PM, 10 jam total)
  let headerHtml = `<div class="d-flex mb-3 small text-muted" style="min-width: 600px;">`;
  const totalDuration = 10;

  for (let h = 8; h <= 18; h++) {
    headerHtml += `<span style="flex: 1; text-align: center; border-left: 1px dashed #ddd;">${
      h % 12 === 0 ? 12 : h % 12
    } ${h < 12 || h === 12 ? "AM" : "PM"}</span>`;
  }
  headerHtml += `</div>`;
  container.append(headerHtml);

  // Item Jadwal
  scheduleData.forEach((item) => {
    const startOffset = ((item.startHour - 8) / totalDuration) * 100;
    const width = (item.durationHour / totalDuration) * 100;

    const itemHtml = `
            <div class="d-flex align-items-center mb-2">
                <span class="me-3 small text-nowrap" style="width: 100px; flex-shrink: 0;">${item.user}</span>
                <div style="flex: 1; height: 40px; position: relative; min-width: 500px; border-bottom: 1px solid #eee;">
                    <div class="schedule-item ${item.color}" style="margin-left: ${startOffset}%; width: ${width}%;">
                        ${item.task} | ${item.durationHour} Hours
                    </div>
                </div>
            </div>
        `;
    container.append(itemHtml);
  });
}

function renderExpenseList() {
  const container = $("#expense-list");
  container.empty();
  expensesData.forEach((item) => {
    const itemHtml = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center">
                    <span class="badge rounded-circle me-3 ${item.color} p-2">${item.id}</span>
                    <div>
                        <p class="mb-0 fw-bold">${item.name}</p>
                        <small class="text-muted">${item.days} left</small>
                    </div>
                </div>
                <span class="fw-bold">$${item.amount}</span>
            </div>
        `;
    container.append(itemHtml);
  });
}

function renderSidebarProjects() {
  const container = $("#project-list");
  container.empty();
  projectsData.slice(0, 4).forEach((project, index) => {
    const colorClass = [
      "text-danger",
      "text-primary",
      "text-warning",
      "text-info",
    ][index % 4];

    const itemHtml = `
            <a href="#" class="list-group-item list-group-item-action bg-dark text-white small">
                <i class="fas fa-circle me-3 ${colorClass}"></i> ${project.name}
            </a>
        `;
    container.append(itemHtml);
  });
}

// --- 3. FUNGSI CRUD LOGIC (Project Table) ---

let currentDeleteId = null;

function saveProject() {
  const id = parseInt($("#projectId").val());
  const name = $("#projectName").val();
  const progress = parseInt($("#projectProgress").val());
  const status = $("#projectStatus").val();

  if (name && progress >= 0 && progress <= 100) {
    if (id) {
      // Update
      const index = projectsData.findIndex((p) => p.id === id);
      if (index !== -1) {
        projectsData[index] = {
          ...projectsData[index],
          name,
          progress,
          status,
        };
      }
    } else {
      // Create
      const newProject = {
        id: nextProjectId++,
        name: name,
        progress: progress,
        status: status,
        daysLeft: Math.floor(Math.random() * 10),
      };
      projectsData.push(newProject);
    }

    renderAll();
    $("#editModal").modal("hide");
  } else {
    alert("Nama proyek harus diisi dan Progress harus antara 0-100.");
  }
}

function openDeleteModal(id) {
  const project = projectsData.find((p) => p.id === id);
  if (project) {
    currentDeleteId = id;
    $("#deleteProjectName").text(project.name);
    // Pastikan modal diinisialisasi dengan benar
    const deleteModal = new bootstrap.Modal(
      document.getElementById("deleteModal")
    );
    deleteModal.show();
  }
}

function confirmDelete() {
  if (currentDeleteId !== null) {
    projectsData = projectsData.filter((p) => p.id !== currentDeleteId);
    renderAll();
    $("#deleteModal").modal("hide");
    currentDeleteId = null;
  }
}

function openEditModal(id) {
  const project = projectsData.find((p) => p.id === id);
  if (project) {
    $("#modalLabel").text("Ubah Proyek");
    $("#projectId").val(project.id);
    $("#projectName").val(project.name);
    $("#projectProgress").val(project.progress);
    $("#projectStatus").val(project.status);
  }
  // Pastikan modal diinisialisasi dengan benar
  const editModal = new bootstrap.Modal(document.getElementById("editModal"));
  editModal.show();
}

function renderAll() {
  renderTaskInfoCards();
  renderProjectCards();
  renderProjectTable();
  renderTaskSchedule();
  renderExpenseList();
  renderSidebarProjects();
}

// --- 4. jQuery HANDLER (Event Delegation & Sidebar Toggle) ---

$(document).ready(function () {
  // 1. Inisialisasi Tampilan
  renderAll();

  // 2. Sidebar Toggle & Link Interaksi
  $("#wrapper").on("click", "a", function (e) {
    if ($(this).closest("#sidebar-wrapper").length) {
      e.preventDefault();

      $("#main-menu a, #project-list a").removeClass("active");
      $(this).addClass("active");

      // Tutup sidebar setelah mengklik link di mobile
      if ($(window).width() < 768) {
        $("#wrapper").removeClass("toggled");
      }

      const linkText = $(this).text().trim();
      if (linkText !== "Dashboard") {
        console.log(`Navigasi Simulasi: Klik pada ${linkText}`);
      }
    }
  });

  // Toggle Sidebar (untuk tombol di header)
  $("#sidebarToggle").on("click", function () {
    $("#wrapper").toggleClass("toggled");
  });

  // Event handler untuk tombol TUTUP (X) di sidebar (Mobile)
  $("#sidebarClose").on("click", function () {
    $("#wrapper").removeClass("toggled");
  });

  // 3. CRUD Project Form Submit/Save
  $("#saveProjectBtn").on("click", saveProject);

  // Reset modal saat ditutup
  $("#editModal").on("hidden.bs.modal", function () {
    $("#projectForm")[0].reset();
    $("#projectId").val("");
    $("#modalLabel").text("Tambah Proyek");
  });

  // Event handler untuk tombol 'Tambah Baru' (CREATE)
  $('.card-header button[data-bs-target="#editModal"]').on(
    "click",
    function () {
      $("#modalLabel").text("Tambah Proyek");
      $("#projectId").val("");
    }
  );

  // 4. Event Delegation untuk Tombol Edit (Dinamis)
  $("#projectTableBody").on("click", ".edit-btn", function () {
    const id = parseInt($(this).data("id"));
    openEditModal(id);
  });

  // 5. Event Delegation untuk Tombol Delete (Dinamis)
  $("#projectTableBody").on("click", ".delete-btn", function () {
    const id = parseInt($(this).data("id"));
    openDeleteModal(id);
  });

  // 6. Konfirmasi Hapus
  $("#confirmDeleteBtn").on("click", confirmDelete);
});
