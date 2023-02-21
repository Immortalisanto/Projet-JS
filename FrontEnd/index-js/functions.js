/**
 * Generate projects at page load
 *
 * @param {Iterable} works objects collection retrieved from GET /api/works
 * @returns {void}
 */
export function generateWorks(works) {

    // Generation of all works
    for (let i = 0; i < works.length; i++) {

        // Building a work
        const imageWork = document.createElement("img");
        // Remove error from image origin
        imageWork.setAttribute("crossorigin", "anonymous");
        imageWork.src = works[i].imageUrl;

        const titleWork = document.createElement("figcaption");
        titleWork.innerText = works[i].title;

        // Attachment to the DOM
        const figureWork = document.createElement("figure");
        const sectionGallery = document.querySelector(".gallery");
        figureWork.appendChild(imageWork);
        figureWork.appendChild(titleWork);
        sectionGallery.appendChild(figureWork);
    };
};

/**
 * Generate filters at page load
 *
 * @param {Iterable} filters objects collection retrieved from GET /api/categories
 * @returns {void}
 */
export function generateFilters(filters) {
    // Creation of the "TOUS" button
    const buttonAll = document.createElement("button");
    buttonAll.classList.add("buttonAll", "focus_button");
    buttonAll.innerText = "Tous";

    // Attachment of the button "TOUS" to the DOM
    const sectionFilters = document.querySelector(".filters");
    sectionFilters.appendChild(buttonAll);

    // Loop for other filters
    for (let i = 0; i < filters.length; i++) {

        // Building a filter
        const filterButton = document.createElement("button");
        filterButton.dataset.categoryId = filters[i].id;
        filterButton.innerText = filters[i].name;

        // Attachment to the DOM
        sectionFilters.appendChild(filterButton);
    };
};

/**
 * Generate modifications at home page for the admin user
 */
export function generateAdminRights() {

    // Changing the login to logout
    document.querySelector(".login_link").innerHTML = "logout";

    // Icon creation
    const iconeEditMode = document.createElement("i");
    iconeEditMode.classList.add("fa-solid", "fa-pen-to-square", "iconeEditMode");

    // Adding of the black banner above the header
    const headband = document.createElement("div");
    headband.classList.add("headband");
    const header = document.querySelector("header");
    document.querySelector("body").insertBefore(headband, header);

    // Adding the content of this banner
    headband.appendChild(iconeEditMode);

    const editMode = document.createElement("p");
    editMode.innerText = "Mode édition";
    headband.appendChild(editMode);

    const publishButton = document.createElement("button");
    publishButton.innerText = "publier les changements";
    headband.appendChild(publishButton);


    // Adding 3 "modifier" buttons

    // Adding in the introduction

    // Icon creation
    const iconeIntroductionArticle = document.createElement("i");
    iconeIntroductionArticle.classList.add("fa-solid", "fa-pen-to-square", "modifIcone");

    // Creation of the "modifier" button
    const modifButtonIntroductionArticle = document.createElement("a");
    modifButtonIntroductionArticle.classList.add("modifButton");
    modifButtonIntroductionArticle.href = "#";
    modifButtonIntroductionArticle.innerText = "modifier";
    const titleArticle = document.querySelector("article h2");
    modifButtonIntroductionArticle.appendChild(iconeIntroductionArticle);
    document.querySelector("article").insertBefore(modifButtonIntroductionArticle, titleArticle);

    // Adding in the figure

    // Icone creation
    const iconeIntroductionFigure = document.createElement("i");
    iconeIntroductionFigure.classList.add("fa-solid", "fa-pen-to-square", "modifIcone");

    // Creation of the "modifier" button
    const modifButtonIntroductionFigure = document.createElement("a");
    modifButtonIntroductionFigure.classList.add("modifButton");
    modifButtonIntroductionFigure.href = "#";
    modifButtonIntroductionFigure.innerText = "modifier";
    modifButtonIntroductionFigure.appendChild(iconeIntroductionFigure);
    document.querySelector("#introduction figure").appendChild(modifButtonIntroductionFigure);

    // Adding after the works title

    // Icon creation
    const iconeWorks = document.createElement("i");
    iconeWorks.classList.add("fa-solid", "fa-pen-to-square", "modifIcone");

    // Creation of the "modifier" button
    const modifButtonWorks = document.createElement("a");
    modifButtonWorks.classList.add("modifButton", "worksButtonModif");
    modifButtonWorks.href = "#modal";
    modifButtonWorks.innerText = "modifier";
    modifButtonWorks.appendChild(iconeWorks);
    document.querySelector("#title_and_modif_button").appendChild(modifButtonWorks);
};

/**
 * Generate works for the modal page
 *
 * @param {Iterable} works objects collection retrieved from GET /api/works
 * @returns {void}
 */
export function generateWorksForModal(works) {

    // Generation of all works
    for (let i = 0; i < works.length; i++) {

        // Building a work
        const imageWork = document.createElement("img");
        // Remove error from image origin
        imageWork.setAttribute("crossorigin", "anonymous");
        imageWork.src = works[i].imageUrl;

        // trash can icon for work deletion
        const trashcan = document.createElement("i");
        trashcan.classList.add("fa-regular", "fa-trash-can", "trashcan");
        trashcan.dataset.trashcanId = works[i].id;

        // "éditer" link
        const editWork = document.createElement("a");
        editWork.href = "#";
        editWork.innerText = "éditer";

        // 4 arrows icon
        const arrow = document.createElement("i");
        arrow.classList.add("fa-solid", "fa-arrows-up-down-left-right", "arrow");

        // Attachment to the DOM
        const figureWork = document.createElement("figure");
        const worksListToModif = document.getElementById("worksListToModif");
        figureWork.appendChild(imageWork);
        // Adding the 4 arrows icon to the first work
        if (i == 0) {
            figureWork.appendChild(arrow);
        };

        figureWork.appendChild(trashcan);
        figureWork.appendChild(editWork);
        worksListToModif.appendChild(figureWork);
    };
};

/**
 * Generate the modal page
 *
 * @param {Iterable} filters objects collection retrieved from GET /api/categories
 * @returns {void}
 */
export function generateModal(filters) {

    // Modal home page generation
    let modal = null;

    const openModal = function(e) {

        // Modal display reset
        if (modal === null) {
            document.querySelector("#modalHomePage").classList.remove("displayNone");
            document.querySelector("#modalAddPhotoPage").classList.add("displayNone");
            document.querySelector(".arrow-left").classList.add("hidden");
            document.getElementById("addPhotoForm").reset();
            document.getElementById("addPhoto").value = null;

            // Creation of the icon if the one is not already created
            if (!addPhotoBox.querySelector(".iconeRemoveAfterUpload")) {
                const icone = document.createElement("i");
                icone.classList.add("fa-solid", "fa-image", "iconeRemoveAfterUpload");
                document.getElementById("addPhotoBox").insertBefore(icone, document.querySelector(".labelRemoveAfterUpload"));
            };

            addPhotoBox.querySelector(".labelRemoveAfterUpload").classList.remove("displayNone");
            addPhotoBox.querySelector(".inputRemoveAfterUpload").classList.remove("displayNone");
            addPhotoBox.querySelector(".paragraphRemoveAfterUpload").classList.remove("displayNone");
            document.getElementById("postForm").classList.replace("greenButton", "greyButton");
        };

        modal = document.querySelector(e.target.getAttribute("href"));
        modal.classList.remove("displayNone");
        modal.removeAttribute("arya-hidden");
        modal.setAttribute("arya-modal", "true");
        modal.addEventListener("click", closeModal);
        modal.querySelector(".closeModal").addEventListener("click", closeModal);
        modal.querySelector(".stopPropagation").addEventListener("click", stopPropagation);
    };

    const closeModal = function() {
        if (modal === null) return;
        modal.classList.add("displayNone");
        modal.removeAttribute("arya-modal");
        modal.setAttribute("arya-hidden", "true");
        modal.removeEventListener("click", closeModal);
        modal = null;

        // Do not show thumbnail after closing
        document.getElementById("photoToAdd").classList.add("displayNone");
        document.getElementById("photoToAdd").dataset.previewPhoto = "";
    };

    const stopPropagation = function(e) {
        e.stopPropagation();
    };

    document.querySelector(".worksButtonModif").addEventListener("click", openModal);

    // Generation of the photo addition page of the modal
    document.querySelector("#buttonModalAddPhotoPage").addEventListener("click", function() {
        document.querySelector("#modalHomePage").classList.toggle("displayNone");
        document.querySelector("#modalAddPhotoPage").classList.toggle("displayNone");
        document.querySelector(".arrow-left").classList.toggle("hidden");
    });

    // Back to the modal homepage
    document.querySelector(".arrow-left").addEventListener("click", function() {
        document.querySelector("#modalAddPhotoPage").classList.toggle("displayNone");
        document.querySelector("#modalHomePage").classList.toggle("displayNone");
        document.querySelector(".arrow-left").classList.toggle("hidden");
        document.getElementById("addPhotoForm").reset();
        document.getElementById("addPhoto").value = null;

        // Creation of the icon if the one is not already created
        if (!addPhotoBox.querySelector(".iconeRemoveAfterUpload")) {
            const icone = document.createElement("i");
            icone.classList.add("fa-solid", "fa-image", "iconeRemoveAfterUpload");
            document.getElementById("addPhotoBox").insertBefore(icone, document.querySelector(".labelRemoveAfterUpload"));
        };

        addPhotoBox.querySelector(".labelRemoveAfterUpload").classList.remove("displayNone");
        addPhotoBox.querySelector(".inputRemoveAfterUpload").classList.remove("displayNone");
        addPhotoBox.querySelector(".paragraphRemoveAfterUpload").classList.remove("displayNone");

        // Don't show thumbnail after return
        document.getElementById("photoToAdd").classList.add("displayNone");
        document.getElementById("photoToAdd").dataset.previewPhoto = "";
        document.getElementById("postForm").classList.replace("greenButton", "greyButton");
    });

    // Added "options" to category in modal form
    for (let filter of filters) {
        const category = document.createElement("option");
        category.innerText = filter.name;
        category.value = filter.id;
        document.getElementById("categoryPhoto").appendChild(category);
    };
};

/**
 * Generate a thumbnail after loading the photo
 *
 * @param {Event} e
 */
export function previewPhoto(e) {

    let photoToAdd = document.getElementById("photoToAdd");
    // FileList object
    const photo = e.currentTarget.files;

    // "photo" is a File object
    if (photo) {

        // FileReader object
        let reader = new FileReader();

        // Triggers when full read
        reader.onload = function (e) {

            // Modify the src of the img
            photoToAdd.src = e.target.result;
        };

        // Deletion of elements in "addPhotoBox" to have only the display of the photo
        let addPhotoBox = document.getElementById("addPhotoBox");

        addPhotoBox.querySelector(".iconeRemoveAfterUpload").remove();
        addPhotoBox.querySelector(".labelRemoveAfterUpload").classList.add("displayNone");
        addPhotoBox.querySelector(".inputRemoveAfterUpload").classList.add("displayNone");
        addPhotoBox.querySelector(".paragraphRemoveAfterUpload").classList.add("displayNone");

        // Reading the uploaded file
        reader.readAsDataURL(photo);
    };
};

/**
 * Switch to green the validate button after form is complete
 */
export function switchToGreenTheValidateButton() {
    let photoForm = document.getElementById("addPhoto").files[0];
    let photoTitle = document.getElementById("photoTitle").value;
    let photoCategory = document.getElementById("categoryPhoto").value;

    if (photoForm && photoTitle && photoCategory) {
        document.getElementById("postForm").classList.replace("greyButton", "greenButton");
    };
};