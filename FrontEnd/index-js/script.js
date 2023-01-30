import { generateWorks, generateFilters, generateAdminRights } from "./functions.js";

// Récupération des projets
const works = await fetch("http://localhost:5678/api/works").then(works => works.json());

// Récupération des différentes catégories
const filters = await fetch("http://localhost:5678/api/categories").then(filters => filters.json());

// Récupération du token si présent
const adminUser = window.localStorage.getItem("token");

// Génération des projets
generateWorks(works);

// Modification de la page si adminUser
if (adminUser) {
    console.log(adminUser);
    generateAdminRights();
} else {
    generateFilters(filters);
}

// Si adminUser, ajout d'un événement sur le logout 
// pour éviter le retour à la page d'authentification
// Et paramétrage de la déconnexion
const logoutButton = document.querySelector(".login_link");
logoutButton.addEventListener("click", function() {
    if (adminUser) {
        window.localStorage.removeItem("token");
        logoutButton.href = "./index.html";
    }
})

// Paramétrage des boutons filtres
const sectionGallery = document.querySelector(".gallery");

const filterButtons = document.querySelector(".filters").querySelectorAll("button");

for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function() {
        sectionGallery.innerHTML = "";

        // Vérification s'il s'agit du bouton Tous
        if (filterButtons[i].classList.contains("buttonAll")) {

            generateWorks(works);

        } else {
        // Sinon filtrer par catégorie
        
            const filteredWorks = works.filter(function(work) {
                return work.categoryId == filterButtons[i].getAttribute("data-category-id");
                })
            generateWorks(filteredWorks);
        };
    });
};