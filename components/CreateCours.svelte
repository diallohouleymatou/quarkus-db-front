<script>
  import { onMount } from 'svelte';
  import { createCours } from '../src/store/cours.js';
  import { fetchClasses, classes } from './../src/store/classe.js';
  import { fetchProfs, profs } from './../src/store/prof.js';

  let matiere = '';
  let horaire = '';
  let jour = '';
  let prof;  // This will store the selected prof object
  let classe;  // This will store the selected classe object
  let matiereProf = [];

  async function handleCreate() {
    if (prof && classe) {
      await createCours(matiere, prof.id, classe.id, horaire, jour);
      matiere = '';
      horaire = '';
      jour = '';
      prof = null;
      classe = null;
      matiereProf = [];
    }
  }

  onMount(async () => {
    fetchClasses();
    fetchProfs();
  });

  function updateMatieres(selectedProf) {
    if (selectedProf) {
      console.log("Selected prof: ", selectedProf);
      matiereProf = selectedProf.matiereslist; // Assuming prof object has matiereslist property
    }
  }
</script>

<div class="create-form">
  <h2>Create New Cours</h2>

  <!-- Matiere Selection -->
  <select bind:value={matiere}>
    <option value="" disabled selected>Choisir matière</option>
    {#each matiereProf as matiereOption}
      <option value={matiereOption}>{matiereOption}</option>
    {/each}
  </select>

  <!-- Horaire Input -->
  <input type="number" placeholder="Horaire" bind:value={horaire} />

  <!-- Jour Input -->
  <input type="text" placeholder="Jour" bind:value={jour} />

  <!-- Prof Selection -->
  <select bind:value={prof} on:change={() => updateMatieres(prof)}>
    <option value="" disabled selected>Choisir prof</option>
    {#each $profs as profOption}
      <option value={profOption}>{profOption.nom} {profOption.prenom}</option>
    {/each}
  </select>

  <!-- Classe Selection -->
  <select bind:value={classe}>
    <option value="" disabled selected>Choisir classe</option>
    {#each $classes as classeOption}
      <option value={classeOption}>{classeOption.code}</option>
    {/each}
  </select>

  <!-- Create Button -->
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
