document.getElementById('signupForm').addEventListener('submit', async e => {
    e.preventDefault();
    const err = document.getElementById('errorMessage');
    err.style.display = 'none';
    err.textContent = '';

    // Récup des valeurs
    const name        = document.getElementById('name').value.trim();
    const lastname    = document.getElementById('lastname').value.trim();
    const dateEntree  = document.getElementById('dateEntree').value;
    const email       = document.getElementById('email').value.trim();
    const motdepasse  = document.getElementById('motdepasse').value;
    const confirmPwd  = document.getElementById('confirmPassword').value;
    const roleId      = parseInt(document.getElementById('roleId').value, 10);
    const idAffect    = parseInt(document.getElementById('idAffectation').value, 10);
    const idFonction  = parseInt(document.getElementById('idFonction').value, 10);

    // Validations simples
    if (motdepasse !== confirmPwd) return showError('Les mots de passe ne correspondent pas.');
    if (motdepasse.length < 6)      return showError('Le mot de passe doit contenir au moins 6 caractères.');
    if (![1,2].includes(roleId))    return showError('Rôle invalide (1 ou 2).');
    if (isNaN(idAffect) || isNaN(idFonction))
      return showError('Veuillez saisir des IDs valides pour affectation et fonction.');

    // Préparation du payload
    const payload = {
      name,
      lastname,
      dateEntree,
      email,
      motdepasse,
      roleId,
      idAffectation: idAffect,
      idFonction: idFonction
    };

    try {
      const res = await fetch('http://localhost:8081/api/employes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.status);
      }
      alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      window.location.href = '/login.html';
    } catch (e) {
      showError('Erreur serveur : ' + e.message);
    }

    function showError(msg) {
      err.textContent = msg;
      err.style.display = 'block';
    }
  });