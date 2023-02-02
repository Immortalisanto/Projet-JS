document.getElementById("connexion").addEventListener("submit", async function(event) {
    event.preventDefault();
    console.log("preventDefault ok !");

    
    let userEmail = document.getElementById("email").value;
    console.log(userEmail);
    let userPassword = document.getElementById("password").value;
    console.log(userPassword);

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
        console.log(user);
        
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
            
            document.getElementById("error").innerHTML = "";
            console.log(result.userId);
            console.log(result.token);

            // enregistrement du token dans le localStorage
            window.localStorage.setItem("token", result.token);

            alert("Authentification réussie. Cliquez pour valider !");

            document.location.href ="../index.html";
        })
        .catch(error => {
            document.getElementById("error").innerHTML = error.message;
        })      
    };
});