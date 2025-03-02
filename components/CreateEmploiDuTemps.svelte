// src/components/CreateEmploiDuTemps.svelte
<script>
  import { createEmploiDuTemps } from '../src/store/emploiDuTemps';
  let jour = '';
  let heureDebut = '';
  let heureFin = '';
  let matiere = '';

  async function handleCreate() {
    await createEmploiDuTemps(jour, heureDebut, heureFin, matiere);
    jour = '';
    heureDebut = '';
    heureFin = '';
    matiere = '';
  }
</script>

<div class="create-form">
  <h2>Create New Emploi du Temps</h2>
  <input type="text" placeholder="Jour" bind:value={jour} />
  <input type="time" placeholder="Heure Debut" bind:value={heureDebut} />
  <input type="time" placeholder="Heure Fin" bind:value={heureFin} />
  <input type="text" placeholder="Matiere" bind:value={matiere} />
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
