<script>
  import { createProf } from '../src/store/prof';
  let prenom = '';
  let nom = '';
  let specialite = '';
  let matieres = [];

  async function handleCreate() {
    const matieresArray = matieres.split(',').map(m => m.trim()).filter(m => m.length > 0);
    
    await createProf(prenom, nom, matieresArray);
    prenom = '';
    nom = '';
    matieres = '';
  }
</script>

<div class="create-form">
  <h2>Create New Professeur</h2>
  <input type="text" placeholder="Prenom" bind:value={prenom} />
  <input type="text" placeholder="Nom" bind:value={nom} />
  
  <label for="matieres">Matières (separated by commas):</label>
  <input
    type="text"
    id="matieres"
    placeholder="Ex: Math, Physics, Chemistry"
    bind:value={matieres}
  />
  
  <button on:click={handleCreate}>Create</button>
</div>

<style>
  .create-form {
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 20px auto;
  }
  .create-form input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .create-form label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }
  .create-form button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .create-form button:hover {
    background-color: #0056b3;
  }
</style>