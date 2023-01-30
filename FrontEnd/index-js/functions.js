// Fonction pour la génération des projets
export function generateWorks(works) {

    // Génération de tous les projets
    for (let i = 0; i < works.length; i++) {

        // Construction d'un projet
        const imageWork = document.createElement("img");
        // Supprime l'erreur de l'origine de l'image
        imageWork.setAttribute("crossorigin", "anonymous");
        imageWork.src = works[i].imageUrl;
        
        const titleWork = document.createElement("figcaption");
        titleWork.innerText = works[i].title;
        
        // Rattachement au DOM
        const figureWork = document.createElement("figure");
        const sectionGallery = document.querySelector(".gallery");
        figureWork.appendChild(imageWork);
        figureWork.appendChild(titleWork);
        sectionGallery.appendChild(figureWork);
    };
};

// Fonction pour la génération des filtres
export function generateFilters(filters) {

    // Génération de tous les filtres

    // Création du bouton "TOUS"
    const buttonAll = document.createElement("button");
    buttonAll.classList.add("buttonAll");
    buttonAll.innerText = "Tous";

    // Rattachement du bouton "Tous" au DOM
    const sectionFilters = document.querySelector(".filters");
    sectionFilters.appendChild(buttonAll);

    // Boucle pour les autres filtres
    for (let i = 0; i < filters.length; i++) {

        // Construction d'un filtre
        const filterButton = document.createElement("button");
        filterButton.dataset.categoryId = filters[i].id;
        filterButton.innerText = filters[i].name;

        // Rattachement au DOM
        sectionFilters.appendChild(filterButton);
    };
};

// Fonction pour générer les modifications du l'userAdmin
export function generateAdminRights() {

    // Modification du login en logout
    document.querySelector(".login_link").innerHTML = "logout";

    // Création de l'icône
    const iconeEditMode = document.createElement("i");
    iconeEditMode.classList.add("fa-solid", "fa-pen-to-square", "iconeEditMode");

    // Ajout du bandeau noir au dessus du header
    const headband = document.createElement("div");
    headband.classList.add("headband");
    const header = document.querySelector("header");
    document.querySelector("body").insertBefore(headband, header);

        // Ajout du contenu de ce bandeau
        headband.appendChild(iconeEditMode);

        const editMode = document.createElement("p");
        editMode.innerText = "Mode édition";
        headband.appendChild(editMode);

        const publishButton = document.createElement("button");
        publishButton.innerText = "publier les changements";
        headband.appendChild(publishButton);


    // Ajout des 3 boutons "modifier"
    
        // Ajout dans l'introduction

            // Création de l'icône
            const iconeIntroductionArticle = document.createElement("i");
            iconeIntroductionArticle.classList.add("fa-solid", "fa-pen-to-square", "iconeIntroductionArticle");
        
            // Création du bouton "modifier"
            const modifButtonIntroductionArticle = document.createElement("button");
            modifButtonIntroductionArticle.classList.add("modifButton");
            modifButtonIntroductionArticle.innerText = "modifier";

            // Rattachement au DOM
            const introductionArticle = document.querySelector("article");
            const titleArticle = document.querySelector("article h2");
            introductionArticle.insertBefore(iconeIntroductionArticle, titleArticle);
            introductionArticle.insertBefore(modifButtonIntroductionArticle, titleArticle);

        // Ajout dans la figure

            // Création de l'icône
            const iconeIntroductionFigure = document.createElement("i");
            iconeIntroductionFigure.classList.add("fa-solid", "fa-pen-to-square", "iconeIntroductionFigure");
        
            // Création du bouton "modifier"
            const modifButtonIntroductionFigure = document.createElement("button");
            modifButtonIntroductionFigure.classList.add("modifButton");
            modifButtonIntroductionFigure.innerText = "modifier";

            // Rattachement au DOM
            const introductionFigure = document.querySelector("#introduction figure");
            introductionFigure.appendChild(iconeIntroductionFigure);
            introductionFigure.appendChild(modifButtonIntroductionFigure);

        // Ajout après le titre du portfolio (works)

            // Création de l'icône
            const iconeWorks = document.createElement("i");
            iconeWorks.classList.add("fa-solid", "fa-pen-to-square", "iconeWorks");
        
            // Création du bouton "modifier"
            const modifButtonWorks = document.createElement("button");
            modifButtonWorks.classList.add("modifButton");
            modifButtonWorks.innerText = "modifier";

            // Rattachement au DOM
            const titleAndModifButton = document.querySelector("#title_and_modif_button");
            titleAndModifButton.appendChild(iconeWorks);
            titleAndModifButton.appendChild(modifButtonWorks);



    /* Penser à retirer toutes les alertes et les console.log */
};