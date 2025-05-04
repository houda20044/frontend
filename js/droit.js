// Charger les droits
async function chargerDroits() {
    try {
      const response = await fetch("http://localhost:8081/api/droitdeconge/all");
      const data = await response.json();
      const tableBody = document.getElementById("droitTableBody");
      tableBody.innerHTML = ""; // Nettoyer le tableau

      data.forEach(droit => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${droit.employe ? droit.employe.name + " " + droit.employe.lastname : "---"}</td>
          <td>${droit.employe && droit.employe.fonctionEntity ? droit.employe.fonctionEntity.nom : "---"}</td>
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

  // Soumission du formulaire
  document.getElementById("droitForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const data = {
      matricule: parseInt(document.getElementById("matricule").value),
      idExercice: parseInt(document.getElementById("exercice").value),
      nbrJourConsommes: parseInt(document.getElementById("consommes").value),
      nbrJoursRestants: parseInt(document.getElementById("restants").value)
    };

    try {
      await fetch("http://localhost:8081/api/droitdeconge/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      alert("Droit ajouté !");
      document.getElementById("droitForm").reset();
      document.getElementById("droitModal").style.display = "none";
      chargerDroits();
    } catch (error) {
      console.error("Erreur lors de l'ajout du droit :", error);
    }
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

  // Charger les droits dès l'ouverture de la page
  window.addEventListener("DOMContentLoaded", chargerDroits);