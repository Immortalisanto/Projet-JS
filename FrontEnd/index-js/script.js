import {
    generateWorks,
    generateFilters,
    generateAdminRights,
    generateModal,
    generateWorksForModal,
    previewPhoto,
    switchToGreenTheValidateButton,
    closeModal,
    generateWorksAfterFetch,
    generateWorksForModalAfterFetch
} from "./functions.js";

// Recovery of the token if present
const adminUser = window.localStorage.getItem("token");

fetch("http://localhost:5678/api/categories")
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw Error("Impossible de charger les filtres. Veuillez réessayer ultérieurement.");
    }
})
.then(filters => {
    // Modification of the page if adminUser
    if (adminUser) {
        generateAdminRights();
        generateModal(filters);
    } else {
        // Filters generation
        generateFilters(filters);
    }
})
.catch (error => {
    alert(error.message);
});

fetch("http://localhost:5678/api/works")
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw Error("Impossible de charger les projets. Veuillez rafraichir la page ou réessayer ultérieurement.");
    };
})
.then(works => {
    // Works generation
    generateWorks(works);
    generateWorksForModal(works);

    // Setting up the deletion of a project
    let allTrashcan = document.querySelectorAll(".trashcan");
    for (let trashcan of allTrashcan) {
        trashcan.addEventListener("click", function(e) {
            e.preventDefault();

            let id = trashcan.dataset.trashcanId;
            fetch("http://localhost:5678/api/works/" + id, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${adminUser}`
                }
            })
            .then(response => {
                if (response.ok) {
                    alert(`Projet supprimé !`);
                    closeModal();
                    generateWorksAfterFetch();
                    generateWorksForModalAfterFetch();
                } else if (response.status == 500) {
                    alert("Erreur");
                } else if (response.status == 401) {
                    alert("Suppression non autorisée.");
                }
            });
        });
    };

    // Setting up the filters buttons
    const sectionGallery = document.querySelector(".gallery");
    const filterButtons = document.querySelectorAll(".filters button");

    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].addEventListener("click", function() {
            sectionGallery.innerHTML = "";

            // Applies the green color to the selected filter
            for (let j = 0; j < filterButtons.length; j++) {
                filterButtons[j].classList.remove("focus_button");
            };
            filterButtons[i].classList.add("focus_button");

            // Checking if it is the "Tous" button
            if (filterButtons[i].classList.contains("buttonAll")) {

                generateWorks(works);

            } else {
            // Otherwise filter by category
                const filteredWorks = works.filter(function(work) {
                    return work.categoryId == filterButtons[i].dataset.categoryId;
                });
                generateWorks(filteredWorks);
            };
        });
    };
})
.catch(error => {
    alert(error.message);
});

// If adminUser, adding an event on the logout
// to avoid returning to the authentication page
// and configuring the logout
const logoutButton = document.querySelector(".login_link");
logoutButton.addEventListener("click", function() {
    if (adminUser) {
        window.localStorage.removeItem("token");
        logoutButton.href = "./index.html";
    };
});

// Settings for changing the color of the "valider" button
document.getElementById("addPhoto").addEventListener("change", switchToGreenTheValidateButton);
document.getElementById("photoTitle").addEventListener("input", switchToGreenTheValidateButton);
document.getElementById("categoryPhoto").addEventListener("change", switchToGreenTheValidateButton);

// Check image size
document.getElementById("addPhoto").addEventListener("change", function(e) {
    let photoForm = document.getElementById("addPhoto").files[0];
    const photoFormSize = photoForm.size / 1024 / 1024;
    if (photoFormSize < 4) {
        // Redisplay the image if the modal was previously closed
        document.getElementById("photoToAdd").classList.remove("displayNone");

        previewPhoto(e);
        document.getElementById("photoToAdd").dataset.previewPhoto = "OK";
    } else {
        addPhotoForm.querySelector(".error").innerHTML = "La taille de l'image est trop volumineuse.";
    };
});

// Settings for sending a new project (add photo modal)
let addPhotoForm = document.getElementById('addPhotoForm');
addPhotoForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let photoForm = document.getElementById("addPhoto").files[0];
    let photoTitle = document.getElementById("photoTitle").value;
    let photoCategory = document.getElementById("categoryPhoto").value;

    let formData = new FormData(addPhotoForm);
    formData.append("image", photoForm);
    formData.append("title", photoTitle);
    formData.append("category", photoCategory);

    // Check if previewPhoto OK
    if (document.getElementById("photoToAdd").dataset.previewPhoto == "OK") {
        // Submit new project
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "authorization": `Bearer ${adminUser}`,
                "accept": "application/json"
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert(`Projet \"${photoTitle}\" envoyé avec succès !`);

                closeModal();
                generateWorksAfterFetch();

                fetch("http://localhost:5678/api/works")
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw Error("Impossible de charger les projets. Veuillez rafraichir la page ou réessayer ultérieurement.");
                    };
                })
                .then(works => {
                    document.getElementById("worksListToModif").innerHTML="";
                    generateWorksForModal(works);

                    // Setting up the deletion of a project
                    let allTrashcan = document.querySelectorAll(".trashcan");
                    for (let trashcan of allTrashcan) {
                        trashcan.addEventListener("click", function(e) {
                            e.preventDefault();

                            let id = trashcan.dataset.trashcanId;
                            fetch("http://localhost:5678/api/works/" + id, {
                                method: "DELETE",
                                headers: {
                                    "authorization": `Bearer ${adminUser}`
                                }
                            })
                            .then(response => {
                                if (response.ok) {
                                    alert(`Projet supprimé !`);
                                    closeModal();
                                    generateWorksAfterFetch();
                                    generateWorksForModalAfterFetch();
                                } else if (response.status == 500) {
                                    alert("Erreur");
                                } else if (response.status == 401) {
                                    alert("Suppression non autorisée.");
                                }
                            });
                        });
                    };
                });

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

            } else if (response.status == 400 || response.status == 500) {
                throw new Error("Erreur dans la saisie des informations.");
            } else if (response.status == 401) {
                throw new Error("Envoi des nouvelles informations non autorisé.");
            }
        })
        .catch(error => {
            addPhotoForm.querySelector(".error").innerHTML = error.message;
        });

    } else {

        alert("Veuillez sélectionner une photo.");
    };
});