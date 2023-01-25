import { generateWorks, generateFilters } from "./functions.js";

// Récupération des projets
const works = await fetch("http://localhost:5678/api/works").then(works => works.json());

// Récupération des différentes catégories
const filters = await fetch("http://localhost:5678/api/categories").then(filters => filters.json());

generateFilters(filters);
generateWorks(works);

// Paramétrage des boutons filtres


const sectionGallery = document.querySelector(".gallery");

// Bouton Tous
const buttonAll = document.querySelector(".buttonAll");
buttonAll.addEventListener("click", function() {
    sectionGallery.innerHTML = "";
    generateWorks(works);
});

// Bouton Objets
const buttonObjects = document.querySelector(".Objets");
buttonObjects.addEventListener("click", function() {
    const filteredWorks = works.filter(function(work) {
        return work.categoryId === 1;
    })
    sectionGallery.innerHTML = "";
    generateWorks(filteredWorks);
});

// Bouton Appartements
const buttonApartments = document.querySelector(".Appartements");
buttonApartments.addEventListener("click", function() {
    const filteredWorks = works.filter(function(work) {
        return work.categoryId === 2;
    })
    sectionGallery.innerHTML = "";
    generateWorks(filteredWorks);
});

// Bouton Hotels & restaurants
const buttonHotelsAndRestaurants = document.querySelector(".Hotels");
buttonHotelsAndRestaurants.addEventListener("click", function() {
    const filteredWorks = works.filter(function(work) {
        return work.categoryId === 3;
    })
    sectionGallery.innerHTML = "";
    generateWorks(filteredWorks);
});

/*
Gérer les filtres categories avec des data attributes
  - voir l'attribut dataset des Element js
  - voir le selecteur CSS qui permet de cibler par rapport aux attributs d'un élément
  - voir la negation dans les selecteurs CSS spoiler :not()

*/
