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
    buttonAll.classList.add("buttonAll", "focus_button");
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
            iconeIntroductionArticle.classList.add("fa-solid", "fa-pen-to-square", "modifIcone");
        
            // Création du bouton "modifier"
            const modifButtonIntroductionArticle = document.createElement("a");
            modifButtonIntroductionArticle.classList.add("modifButton");
            modifButtonIntroductionArticle.href = "#";
            modifButtonIntroductionArticle.innerText = "modifier";
            const titleArticle = document.querySelector("article h2");
            modifButtonIntroductionArticle.appendChild(iconeIntroductionArticle);
            document.querySelector("article").insertBefore(modifButtonIntroductionArticle, titleArticle);

        // Ajout dans la figure

            // Création de l'icône
            const iconeIntroductionFigure = document.createElement("i");
            iconeIntroductionFigure.classList.add("fa-solid", "fa-pen-to-square", "modifIcone");
        
            // Création du bouton "modifier"
            const modifButtonIntroductionFigure = document.createElement("a");
            modifButtonIntroductionFigure.classList.add("modifButton");
            modifButtonIntroductionFigure.href = "#";
            modifButtonIntroductionFigure.innerText = "modifier";
            modifButtonIntroductionFigure.appendChild(iconeIntroductionFigure);
            document.querySelector("#introduction figure").appendChild(modifButtonIntroductionFigure);

        // Ajout après le titre du portfolio (works)

            // Création de l'icône
            const iconeWorks = document.createElement("i");
            iconeWorks.classList.add("fa-solid", "fa-pen-to-square", "modifIcone");
        
            // Création du bouton "modifier"
            const modifButtonWorks = document.createElement("a");
            modifButtonWorks.classList.add("modifButton", "worksButtonModif");
            modifButtonWorks.href = "#modal";
            modifButtonWorks.innerText = "modifier";
            modifButtonWorks.appendChild(iconeWorks);
            document.querySelector("#title_and_modif_button").appendChild(modifButtonWorks);
};

// Fonction pour la génération des projets dans la modale
export function generateWorksForModal(works) {

    // Génération de tous les projets
    for (let i = 0; i < works.length; i++) {

        // Construction d'un projet
        const imageWork = document.createElement("img");
        // Supprime l'erreur de l'origine de l'image
        imageWork.setAttribute("crossorigin", "anonymous");
        imageWork.src = works[i].imageUrl;

        const trashcan = document.createElement("i");
        trashcan.classList.add("fa-regular", "fa-trash-can", "trashcan");
        
        const editWork = document.createElement("a");
        editWork.href = "#";
        editWork.innerText = "éditer";
        
        const arrow = document.createElement("i");
        arrow.classList.add("fa-solid", "fa-arrows-up-down-left-right", "arrow");
        
        // Rattachement au DOM
        const figureWork = document.createElement("figure");
        const worksListToModif = document.getElementById("worksListToModif");
        figureWork.appendChild(imageWork);
        if (i == 0) {
            figureWork.appendChild(arrow);
        }
        figureWork.appendChild(trashcan);
        figureWork.appendChild(editWork);
        worksListToModif.appendChild(figureWork);
    };
};

// Fonction pour l'affichage de la modale
export function generateModal() {

    // Génération page d'accueil de la modale
    let modal = null;

    const openModal = function(e) {
        modal = document.querySelector(e.target.getAttribute("href"));
        modal.style.display = null;
        modal.removeAttribute("arya-hidden");
        modal.setAttribute("arya-modal", "true");
        modal.addEventListener("click", closeModal);
        modal.querySelector(".closeModal").addEventListener("click", closeModal);
        modal.querySelector(".stopPropagation").addEventListener("click", stopPropagation);
    };

    const closeModal = function() {
        if (modal === null) return;
        modal.style.display = "none";
        modal.removeAttribute("arya-modal");
        modal.setAttribute("arya-hidden", "true");
        modal.removeEventListener("click", closeModal);
        modal = null;
    };

    const stopPropagation = function(e) {
        e.stopPropagation();
    }

    document.querySelector(".worksButtonModif").addEventListener("click", openModal);

    // Génération page d'ajout de photo de la modale
    document.querySelector("#buttonModalAddPhotoPage").addEventListener("click", function() {
        document.querySelector("#modalHomePage").setAttribute("style", "display: none");
        document.querySelector("#modalAddPhotoPage").removeAttribute("style");
        document.querySelector(".arrow-left").removeAttribute("style");
    });

    // Retour vers la page d'accueil de la modale
    document.querySelector(".arrow-left").addEventListener("click", function() {
        document.querySelector("#modalAddPhotoPage").setAttribute("style", "display: none");
        document.querySelector("#modalHomePage").removeAttribute("style");
        document.querySelector(".arrow-left").setAttribute("style", "display: none");
    });
};

// Fonction pour afficher la miniature de la photo après upload
export function previewPhoto(e) {
    let photoToAdd = document.getElementById("photoToAdd");
    // Objet FileList
    const [photo] = e.currentTarget.files;

    // "photo" est un objet File
    if (photo) {
        
        // Objet FileReader
        let reader = new FileReader();

        // Se déclenche quand lecture complète
        reader.onload = function (e) {

            // Modif du src de l'img
            photoToAdd.src = e.target.result;
        };

        // Suppression des éléments dans "addPhotoBox" pour n'avoir que l'affichage de la photo
        let addPhotoBox = document.getElementById("addPhotoBox");
        
        addPhotoBox.querySelector(".iconeRemoveAfterUpload").remove();
        addPhotoBox.querySelector(".labelRemoveAfterUpload").remove();
        addPhotoBox.querySelector(".inputRemoveAfterUpload").innerHTML = "";
        addPhotoBox.querySelector(".paragraphRemoveAfterUpload").remove();

        // Lecture du ficher uploadé
        reader.readAsDataURL(photo);
    };
};

// Fonction pour modifier la couleur du bouton "valider" du formulaire
export function switchToGreenTheValidateButton() {
    let photoForm = document.getElementById("addPhoto").files[0];
    let photoTitle = document.getElementById("photoTitle").value;
    let photoCategory = document.getElementById("categoryPhoto").value;

    if (photoForm && photoTitle && photoCategory) {
        document.getElementById("postForm").classList.replace("greyButton", "greenButton");
    };
};