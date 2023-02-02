document.getElementById("connexion").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    let userEmail = document.getElementById("email").value;
    let userPassword = document.getElementById("password").value;

    let error;

    if (!userEmail && !userPassword) {
        error = "Veuillez renseigner tous les champs."
    } else if (!userPassword) {
        error = "Veuillez renseigner un mot de passe.";
    } else if (!userEmail) {
        error = "Veuillez renseigner un email.";
    };

    if (error) {
        document.getElementById("error").innerHTML = error;
    } else {
        let user = {
            email: userEmail,
            password: userPassword
        };
        
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            // ici on contrôle la réponse
            if (response.ok) {
                return response.json();
            }

            if (response.status == 401 || response.status == 404) {
                throw new Error("Erreur dans l’identifiant ou le mot de passe");
            }

            throw new Error('error message');
        })
        .then(result => {
            // enregistrement du token dans le localStorage
            window.localStorage.setItem("token", result.token);

            // Redirection vers la page d'accueil
            document.location.href ="../index.html";
        })
        .catch(error => {
            document.getElementById("error").innerHTML = error.message;
        })      
    };
});