<script>
  import { onMount } from 'svelte';
  import { createEtudiant } from '../src/store/etudiant';
  import { fetchClasses, classes } from './../src/store/classe.js';

  let prenom = '';
  let nom = '';
  let selectedClasse = '';  // Variable to hold the selected class

  onMount(async () => {
    fetchClasses();
  });

  async function handleCreate() {
    await createEtudiant(prenom, nom, selectedClasse); // Pass selectedClasse
    prenom = '';
    nom = '';
    selectedClasse = '';
  }
</script>

<div class="create-form">
  <h2>Create New Etudiant</h2>
  <input type="text" placeholder="Prenom" bind:value={prenom} />
  <input type="text" placeholder="Nom" bind:value={nom} />
  
  <select bind:value={selectedClasse}>
    <option value="" disabled selected>Select a class</option>
    {#each $classes as classe}
      <option value={classe.id}>{classe.code} (Niveau {classe.niveau})</option>
    {/each}
  </select>

  <!-- <input type="email" placeholder="Email" bind:value={email} /> -->
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

  .create-form input, .create-form select {
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
