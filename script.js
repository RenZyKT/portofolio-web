// Data proyek yang disimpan di localStorage
let projects = JSON.parse(localStorage.getItem('projects')) || [];

// Fungsi untuk menampilkan konten proyek ke halaman
function displayProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = ''; // Kosongkan daftar proyek sebelumnya

    projects.forEach((project, index) => {
        let projectItem = document.createElement('div');
        projectItem.classList.add('project-item');
        projectItem.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description.substring(0, 100)}...</p>
            <button class="open-modal" onclick="openModal(${index})">Lihat Detail</button>
        `;
        projectList.appendChild(projectItem);
    });
}

// Fungsi untuk membuka modal dengan detail
function openModal(index) {
    const modal = document.getElementById('modal-template');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalAttachments = modal.querySelector('.attachments');
    
    const project = projects[index];
    modalTitle.innerText = project.title;
    modalDescription.innerText = project.description;
    modalAttachments.innerHTML = `<img src="${project.attachment}" alt="Lampiran" />`;

    // Menampilkan modal
    modal.style.display = "block";
}

// Fungsi untuk menutup modal
function closeModal() {
    const modal = document.getElementById('modal-template');
    modal.style.display = "none";
}

// Fungsi untuk menambahkan proyek baru
function addProject(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const attachment = document.getElementById('attachment').value;

    const newProject = { title, description, attachment };
    projects.push(newProject);

    // Simpan proyek baru ke localStorage
    localStorage.setItem('projects', JSON.stringify(projects));

    // Tampilkan proyek yang baru ditambahkan
    displayProjects();

    // Reset form
    document.getElementById('update-form').reset();
}

// Event listener untuk form
document.getElementById('update-form').addEventListener('submit', addProject);

// Menampilkan proyek yang sudah ada saat halaman dimuat
window.onload = displayProjects;
