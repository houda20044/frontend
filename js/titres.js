// Fetch et affichage des droits
function chargerDroits() {
    fetch("http://localhost:8081/api/droitdeconge/all")
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById("droitTableBody");
        tableBody.innerHTML = "";
        if (Array.isArray(data)) {
          data.forEach(droit => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${droit.employe ? droit.employe.name + ' ' + droit.employe.lastname : '---'}</td>
              <td>${droit.employe && droit.employe.fonctionEntity ? droit.employe.fonctionEntity.nom : '---'}</td>
             <td>${droit.nbrJourConsommes}</td>
<td>${droit.nbrJoursRestants}</td>
<td>${droit.nbrJourConsommes + droit.nbrJoursRestants}</td>

            `;
            tableBody.appendChild(row);
          });
        }
      })
      .catch(err => console.log("Erreur chargement droits (ignorée):", err));
  }

  window.addEventListener("DOMContentLoaded", chargerDroits);

  // Soumission du formulaire
  document.getElementById("droitForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const data = {
      nbrJourConsommes: parseInt(document.getElementById("consommes").value),
      nbrJoursRestants: parseInt(document.getElementById("restants").value),
      matricule: parseInt(document.getElementById("matricule").value),
      idExercice: parseInt(document.getElementById("exercice").value)
    };
    fetch("http://localhost:8081/api/droitdeconge/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(() => {
      alert("Droit ajouté !");
      document.getElementById("droitForm").reset();
      chargerDroits();
      document.getElementById("droitModal").style.display = "none";
    })
    .catch(err => console.log("Erreur POST (ignorée):", err));
  });

  // Gestion du modal
  const modal = document.getElementById("droitModal");
  const btn = document.getElementById("openModalBtn");
  const span = document.querySelector(".close");

  btn.onclick = () => modal.style.display = "block";
  span.onclick = () => modal.style.display = "none";
  window.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
  };
  async function chargerDroits() {
    try {
      const response = await fetch("http://localhost:8081/droits/all");
      const data = await response.json();
      const tableBody = document.getElementById("droitTableBody");

      tableBody.innerHTML = ""; // Nettoyer le tableau

      data.forEach(droit => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${droit.employe.nom}</td>
          <td>${droit.employe.prenom}</td>
          <td>${droit.employe.fonctionEntity.nom}</td>
          <td>${droit.nbrJourConsommes}</td>
          <td>${droit.nbrJoursRestants}</td>
          <td>${droit.nbrJourConsommes + droit.nbrJoursRestants}</td>
        `;

        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Erreur lors du chargement des droits :", error);
    }
  }

  // Charger les droits dès le chargement de la page
  window.onload = chargerDroits;
