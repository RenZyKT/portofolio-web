// Data proyek yang disimpan di localStorage
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let internship = JSON.parse(localStorage.getItem('internship')) || [];
let competition = JSON.parse(localStorage.getItem('competition')) || [];
let research = JSON.parse(localStorage.getItem('research')) || [];
let certification = JSON.parse(localStorage.getItem('certification')) || [];
let organization = JSON.parse(localStorage.getItem('organization')) || [];

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
            <button class="open-modal" onclick="openModal(${index}, 'project-list')">Lihat Detail</button>
        `;
        projectList.appendChild(projectItem);
    });
}

// Fungsi untuk menampilkan proyek lain (magang, lomba, dll.)
function displayOtherContent(containerId, dataArray) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Kosongkan konten sebelumnya

    dataArray.forEach((item, index) => {
        let contentItem = document.createElement('div');
        contentItem.classList.add('project-item');
        contentItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description.substring(0, 100)}...</p>
            <button class="open-modal" onclick="openModal(${index}, '${containerId}')">Lihat Detail</button>
        `;
        container.appendChild(contentItem);
    });
}

// Fungsi untuk membuka modal dengan detail
function openModal(index, containerId) {
    const modal = document.getElementById('modal-template');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalAttachments = modal.querySelector('.attachments');
    
    let dataArray;
    if (containerId === 'project-list') dataArray = projects;
    else if (containerId === 'internship-list') dataArray = internship;
    else if (containerId === 'competition-list') dataArray = competition;
    else if (containerId === 'research-list') dataArray = research;
    else if (containerId === 'certification-list') dataArray = certification;
    else if (containerId === 'organization-list') dataArray = organization;
    
    modalTitle.innerText = dataArray[index].title;
    modalDescription.innerText = dataArray[index].description;
    modalAttachments.innerHTML = `<img src="${dataArray[index].attachment}" alt="Lampiran" />`;

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

// Menampilkan proyek dan data lain saat halaman dimuat
window.onload = function() {
    displayProjects();
    displayOtherContent('internship-list', internship);
    displayOtherContent('competition-list', competition);
    displayOtherContent('research-list', research);
    displayOtherContent('certification-list', certification);
    displayOtherContent('organization-list', organization);
};