// Fonction pour la génération des projets
export async function generateWorks() {

    // Récupération des projets
    const works = await fetch("http://localhost:5678/api/works").then(works => works.json());

    // Génération de tous les projets
    for (let work of works) {

        // Construction d'un projet
        const imageWork = document.createElement("img");
        // Supprime l'erreur de l'origine de l'image
        imageWork.setAttribute("crossorigin", "anonymous");
        imageWork.src = work.imageUrl;
        
        const titleWork = document.createElement("figcaption");
        titleWork.innerText = work.title;
        
        // Rattachement au DOM
        const figureWork = document.createElement("figure");
        const sectionGallery = document.querySelector(".gallery");
        figureWork.appendChild(imageWork);
        figureWork.appendChild(titleWork);
        sectionGallery.appendChild(figureWork);
    };
};