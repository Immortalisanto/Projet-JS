import { generateWorks, generateFilters } from "./functions.js";

// Récupération des projets
const works = await fetch("http://localhost:5678/api/works").then(works => works.json());

// Récupération des différentes catégories
const filters = await fetch("http://localhost:5678/api/categories").then(filters => filters.json());

await generateFilters(filters);
await generateWorks(works);

// Paramétrage des boutons filtres

// Bouton Tous
const buttonAll = document.querySelector(".buttonAll");
buttonAll.addEventListener("click", function() {
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML = "";
    generateWorks(works);
});