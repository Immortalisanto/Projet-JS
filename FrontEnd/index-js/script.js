import {
    generateWorks,
    generateFilters,
    generateAdminRights,
    generateModal,
    generateWorksForModal,
    previewPhoto,
    switchToGreenTheValidateButton
} from "./functions.js";

// Recovery of the token if present
const adminUser = window.localStorage.getItem("token");

fetch("http://localhost:5678/api/categories")
.then(response => {
    if (response.ok) {
        return response.json();
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
    alert("Impossible de charger les filtres. Veuillez rafraichir la page ou réessayer ultérieurement.");
});

fetch("http://localhost:5678/api/works")
.then(response => {
    if (response.ok) {
        return response.json();
    };
})
.then(works => {
    // Works generation
    generateWorks(works);
    generateWorksForModal(works);

    // Setting up the deletion of a project
    const allTrashcan = document.querySelectorAll(".trashcan");
    for (let trashcan of allTrashcan) {
        trashcan.addEventListener("click", function() {

            let id = trashcan.dataset.trashcanId
            fetch("http://localhost:5678/api/works/" + id, {
                method: "DELETE",
                headers: {
                    "authorization": `Bearer ${adminUser}`,
                    "accept": "application/json"
                }
            })
            .then(response => {
                if (response.ok) {
                    alert(`Projet supprimé !`);
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
    alert("Impossible de charger les projets. Veuillez rafraichir la page ou réessayer ultérieurement.");
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