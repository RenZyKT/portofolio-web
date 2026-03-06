// Data portofolio yang disimpan di localStorage
let portfolioData = JSON.parse(localStorage.getItem('portfolioData')) || {
    projects: [],
    internship: [],
    competition: [],
    research: [],
    certification: [],
    organization: []
};

// Fungsi untuk menampilkan data berdasarkan kategori
function displayPortfolio(category) {
    const container = document.getElementById(category + '-list');
    container.innerHTML = ''; // Kosongkan konten sebelumnya

    portfolioData[category].forEach((item, index) => {
        let contentItem = document.createElement('div');
        contentItem.classList.add('project-item');
        contentItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description.substring(0, 100)}...</p>
            <button class="open-modal" onclick="openModal(${index}, '${category}')">Lihat Detail</button>
        `;
        container.appendChild(contentItem);
    });
}

// Fungsi untuk membuka modal dengan detail
function openModal(index, category) {
    const modal = document.getElementById('modal-template');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDescription = modal.querySelector('.modal-description');
    const modalAttachments = modal.querySelector('.attachments');
    
    const item = portfolioData[category][index];
    modalTitle.innerText = item.title;
    modalDescription.innerText = item.description;
    modalAttachments.innerHTML = `<img src="${item.attachment}" alt="Lampiran" />`;

    // Menampilkan modal
    modal.style.display = "block";
}

// Fungsi untuk menutup modal
function closeModal() {
    const modal = document.getElementById('modal-template');
    modal.style.display = "none";
}

// Fungsi untuk menambahkan data baru
function addPortfolio(event) {
    event.preventDefault();

    const category = document.getElementById('category').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const attachment = document.getElementById('attachment').files[0];

    const reader = new FileReader();
    reader.onloadend = function() {
        const newItem = {
            title,
            description,
            attachment: reader.result
        };
        portfolioData[category].push(newItem);

        // Simpan data ke localStorage
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));

        // Tampilkan data yang baru ditambahkan
        displayPortfolio(category);

        // Reset form
        document.getElementById('update-form').reset();
    };
    reader.readAsDataURL(attachment);
}

// Event listener untuk form
document.getElementById('update-form').addEventListener('submit', addPortfolio);

// Menampilkan data yang sudah ada saat halaman dimuat
window.onload = function() {
    displayPortfolio('projects');
    displayPortfolio('internship');
    displayPortfolio('competition');
    displayPortfolio('research');
    displayPortfolio('certification');
    displayPortfolio('organization');
};
