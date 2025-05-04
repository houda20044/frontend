const modal = document.getElementById('demandeModal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.querySelector('.close');

  openModalBtn.onclick = () => {
    modal.style.display = 'block';
  };

  closeModalBtn.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  // Charger les demandes existantes
  function chargerDemandes() {
    fetch('http://localhost:8081/api/dmdconge/all')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('demandeTableBody');
        tableBody.innerHTML = '';

        data.forEach(demande => {
          const row = `
            <tr>
              <td>${demande.matricule}</td>
              <td>${demande.datededemande}</td>
              <td>${demande.duree} jours</td>
              <td>${demande.type_conge}</td>
            </tr>
          `;
          tableBody.innerHTML += row;
        });
      })
      .catch(error => console.error('Erreur lors du chargement des demandes:', error));
  }

  // Ajouter une nouvelle ligne directement dans le tableau
  function ajouterDemandeTable(matricule, datededemande, duree, type_conge) {
    const tableBody = document.getElementById('demandeTableBody');
    const row = `
      <tr>
        <td>${matricule}</td>
        <td>${datededemande}</td>
        <td>${duree} jours</td>
        <td>${type_conge}</td>
      </tr>
    `;
    tableBody.innerHTML += row;
  }

  // Soumission du formulaire
  document.getElementById('demandeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const matricule = document.getElementById('matricule').value;
    const datededemande = document.getElementById('datededemande').value;
    const duree = document.getElementById('duree').value;
    const type_conge = document.getElementById('typeconge').value;

    fetch('http://localhost:8081/api/dmdconge/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        matricule: parseInt(matricule),
        datededemande: datededemande,
        duree: parseInt(duree),
        type_conge: parseInt(type_conge)
      })
    })
    .then(response => {
      if (response.ok) {
        // ajouter directement la ligne avec les données du formulaire
        ajouterDemandeTable(matricule, datededemande, duree, type_conge);
        alert('Demande ajoutée avec succès!');
        modal.style.display = 'none'; // Fermer modal
        document.getElementById('demandeForm').reset(); // Vider form
      } else {
        alert('Erreur lors de l\'ajout de la demande.');
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
      alert('Erreur serveur.');
    });
  });

  // Charger les demandes au démarrage
  chargerDemandes();


  