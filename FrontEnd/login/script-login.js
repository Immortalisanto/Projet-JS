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
    }

    if (error) {
        document.getElementById("error").innerHTML = error;
    } else {
        let user = {
            email: userEmail,
            password: userPassword
        };
        console.log(user);
        
        
        let response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        let result = await response.json();
        console.log(result.userId);
        console.log(result.token);
        
    } 
});