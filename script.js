// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "BIpXzj_4nmyyoGfWCZUCnwnbLGj-W9FKHaSGsWxTdv9WbYL4WquNLvQ4qzgh05x1lfL-92TPhQvJGUJ0K1-dqHk",
    authDomain: "portofolio-web-78c7c.firebaseapp.com",
    projectId: "portofolio-web-78c7c",
    storageBucket: "portofolio-web-78c7c.appspot.com",
    messagingSenderId: "471900657832",
    appId: "portofolio-web-78c7c"
};

// Inisialisasi Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);
const storage = firebase.storage(app);

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
            attachment: reader.result // Menyimpan URL gambar di localStorage
        };
        portfolioData[category].push(newItem);

        // Simpan data ke localStorage
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));

        // Tampilkan data yang baru ditambahkan
        displayPortfolio(category);

        // Reset form
        document.getElementById('update-form').reset();
    };
    reader.readAsDataURL(attachment); // Membaca file gambar
}

// Fungsi untuk login dan verifikasi email
function signIn(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Verifikasi apakah email yang digunakan adalah email Anda
            if (user.email !== "rezanurfadillah647@gmail.com") {
                alert("Akses hanya untuk pemilik portofolio.");
                window.location.href = "/";  // Redirect ke halaman utama jika email tidak cocok
            } else {
                alert("Login berhasil! Anda dapat memperbarui portofolio.");
                // Akses form Update Portofolio diaktifkan
                document.getElementById("update").style.display = "block"; // Menampilkan form Update Portofolio
                document.getElementById("login").style.display = "none"; // Menyembunyikan form login
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Login gagal, pastikan email dan password benar.");
        });
}

// Event listener untuk form login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signIn(email, password);
});

// Menangani pembaruan halaman
window.onload = function() {
    // Hanya menampilkan form update jika sudah login
    if (auth.currentUser) {
        if (auth.currentUser.email === "rezanurfadillah647@gmail.com") {
            document.getElementById("update").style.display = "block";
            document.getElementById("login").style.display = "none";
        } else {
            alert("Akses hanya untuk pemilik portofolio.");
            window.location.href = "/";
        }
    } else {
        document.getElementById("update").style.display = "none";
        document.getElementById("login").style.display = "block";
    }

    // Menampilkan data portofolio
    displayPortfolio('projects');
    displayPortfolio('internship');
    displayPortfolio('competition');
    displayPortfolio('research');
    displayPortfolio('certification');
    displayPortfolio('organization');
};
