import { generateWorks, generateFilters } from "./functions.js";

// Récupération des projets
const works = await fetch("http://localhost:5678/api/works").then(works => works.json());

// Récupération des différentes catégories
const filters = await fetch("http://localhost:5678/api/categories").then(filters => filters.json());

// Génération des éléments de la page
generateFilters(filters);
generateWorks(works);

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