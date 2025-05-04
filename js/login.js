document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupération des valeurs du formulaire
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Appel de l'API pour récupérer tous les employés
    fetch('http://localhost:8081/api/employe/employes') // Assurez-vous que l'API est bien exposée à cette URL
        .then(response => response.json())
        .then(employes => {
            // Chercher l'utilisateur dans la liste des employés
            const user = employes.find(employe => employe.email === username && employe.motdepasse === password);
            
            if (user) {
                // Redirection après connexion réussie
                window.location.href = 'accueil.html';
            } else {
                // Affichage d'un message d'erreur si l'utilisateur n'est pas trouvé
                alert("Nom d'utilisateur ou mot de passe incorrect.");
            }
        })
        .catch(error => {
            console.error('Erreur de connexion à l\'API:', error);
            alert("Une erreur est survenue. Veuillez réessayer.");
        });
});